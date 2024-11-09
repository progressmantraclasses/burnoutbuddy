import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Constants from 'expo-constants';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const CALORIES_PER_STEP = 0.05;

export default function Stepcounter() {
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimestamp, setLastTimeStamp] = useState(0);

  const animationRefRunning = useRef(null);
  const animationRefSitting = useRef(null);

  useEffect(() => {
    let subscription;
    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener((accelerometer) => {
          const { y } = accelerometer;
          const threshold = 0.1;
          const timestamp = new Date().getTime();

          if (
            Math.abs(y - lastY) > threshold &&
            !isCounting &&
            timestamp - lastTimestamp > 800
          ) {
            setIsCounting(true);
            setLastY(y);
            setLastTimeStamp(timestamp);
            setSteps((prevSteps) => prevSteps + 1);
            setTimeout(() => {
              setIsCounting(false);
            }, 1200);
          }
        });
      } else {
        console.log('Accelerometer not available on this device');
      }
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isCounting, lastY, lastTimestamp]);

  const resetSteps = () => {
    setSteps(0);
  };

  const estimatedCaloriesBurned = steps * CALORIES_PER_STEP;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Step Tracker</Text>
      <View style={styles.infoContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsText}>{steps}</Text>
          <Text style={styles.stepsLabel}>Steps</Text>
        </View>
        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesLabel}>Estimated Calories Burned:</Text>
          <Text style={styles.caloriesText}>
            {estimatedCaloriesBurned.toFixed(2)} calories
          </Text>
        </View>
      </View>

      <View style={styles.animationContainer}>
        {isCounting ? (
          <LottieView
            autoPlay
            ref={animationRefRunning}
            style={styles.animation}
            source={require('./assets/walking.json')}
          />
        ) : (
          <LottieView
            autoPlay
            ref={animationRefSitting}
            style={styles.animation}
            source={require('./assets/Sitting.json')}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={resetSteps}>
        <Text style={styles.buttonText}>RESET</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8f5', // Light mint green
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#005f73', // Dark teal
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  stepsText: {
    fontSize: 36,
    color: '#94d2bd', // Soft teal
    fontWeight: 'bold',
    marginRight: 8,
  },
  stepsLabel: {
    fontSize: 24,
    color: '#555', // Neutral grey for contrast
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  caloriesLabel: {
    fontSize: 20,
    color: '#555',
    marginRight: 6,
  },
  caloriesText: {
    fontSize: 18,
    color: '#ee6c4d', // Soft coral for contrast
    fontWeight: 'bold',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f2e9', // Lighter mint green
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  animation: {
    width: width * 0.8,
    height: height * 0.4,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#0a9396', // Deep teal
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#f1f8f5', // White for readability
    fontSize: 18,
    textAlign: 'center',
  },
});
