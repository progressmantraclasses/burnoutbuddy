import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ImageBackground } from 'react-native';

const WebcamPage = () => {
  // Function to handle button press and open the website
  const openWebsite = () => {
    Linking.openURL('https://faceexpresssions.web.app/'); // Replace with your desired URL
  };

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2023/10/12/15/26/nature-8456298_1280.jpg' }} // Background image URL
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Mental Health & Mood</Text>

          <Text style={styles.infoText}>
            Mental health is just as important as physical health. Taking care of your mental well-being can improve your mood, boost your energy, and enhance your overall quality of life. Here are a few tips:
          </Text>

          <View style={styles.tipsContainer}>
            <Text style={styles.listItem}>• Practice mindfulness and meditation.</Text>
            <Text style={styles.listItem}>• Stay connected with friends and family.</Text>
            <Text style={styles.listItem}>• Engage in regular physical activity.</Text>
            <Text style={styles.listItem}>• Make time for hobbies and relaxation.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={openWebsite}>
            <Text style={styles.buttonText}>Track your Mood on Our Website</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 102, 204, 0.7)', // Simulating a gradient with semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d99',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  tipsContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    shadowColor: '#1e88e5',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WebcamPage;
