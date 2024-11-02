import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';
import * as tfReactNative from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';

export default function WebcamPage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isTfReady, setIsTfReady] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [expressions, setExpressions] = useState(null);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Request camera permissions
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      // Initialize TensorFlow and load models
      if (!isTfReady) {
        try {
          console.log("Initializing TensorFlow...");
          await tf.ready();
          await tfReactNative.setBackend('rn-webgl');
          setIsTfReady(true);
          console.log("TensorFlow initialized.");

          // Load models from assets
          console.log("Loading face-api.js models...");
          await faceapi.nets.tinyFaceDetector.loadFromUri('/models'); // Update model path if necessary
          await faceapi.nets.faceExpressionNet.loadFromUri('/models'); // Update model path if necessary
          setModelsLoaded(true);
          console.log("Models loaded successfully.");
        } catch (error) {
          console.error("Error loading TensorFlow or models:", error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, []);

  const processCameraStream = async () => {
    if (cameraRef.current && isTfReady && modelsLoaded) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: false });
        console.log("Captured photo.");

        const imgB64 = await FileSystem.readAsStringAsync(photo.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const input = tfReactNative.decodeJpeg(Buffer.from(imgB64, 'base64'));

        // Detect face and expressions
        const detection = await faceapi
          .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detection) {
          setExpressions(detection.expressions);
          console.log("Detected expressions:", detection.expressions);
        } else {
          setExpressions(null); // Clear expressions if no face is detected
        }
        tf.dispose(input); // Dispose tensors to free memory
      } catch (error) {
        console.error("Error processing camera stream:", error);
      }
    }
  };

  // Periodically run `processCameraStream` every few seconds to avoid blocking UI
  useEffect(() => {
    if (hasPermission) {
      const interval = setInterval(() => {
        processCameraStream();
      }, 2000); // Run every 2 seconds
      return () => clearInterval(interval);
    }
  }, [hasPermission, isTfReady, modelsLoaded]);

  if (hasPermission === null) return <Text>Requesting for camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />
      ) : (
        <Camera 
          style={styles.camera} 
          ref={cameraRef} 
          type={Camera.Constants.Type.front} // Ensure this is correctly referenced
        />
      )}
      {expressions && (
        <View style={styles.expressionsContainer}>
          {Object.keys(expressions).map((expression, index) => (
            <Text key={index} style={styles.expressionText}>
              {expression}: {(expressions[expression] * 100).toFixed(2)}%
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  expressionsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  expressionText: { color: 'white', fontSize: 16 },
});
