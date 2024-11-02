// src/MeditationPage.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ProgressBarAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MeditationPage = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isMeditationStarted, setIsMeditationStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const meditations = [
    { id: 1, title: 'Morning Meditation', duration: 10, steps: ['Sit comfortably', 'Close your eyes', 'Take deep breaths'] },
    { id: 2, title: 'Relaxing Evening', duration: 15, steps: ['Find a quiet place', 'Close your eyes', 'Breathe slowly'] },
    { id: 3, title: 'Mindfulness Exercise', duration: 5, steps: ['Focus on your breath', 'Observe your thoughts', 'Return to breathing'] },
    { id: 4, title: 'Sleep Meditation', duration: 20, steps: ['Lie down comfortably', 'Close your eyes', 'Focus on each body part'] },
    { id: 5, title: 'Anxiety Soother', duration: 8, steps: ['Find a comfortable seat', 'Place your hands on your lap', 'Breathe in slowly for 4 seconds, hold for 4, then exhale for 4', 'Focus on releasing tension with each exhale', 'Continue this cycle for the session'] },
    { id: 6, title: 'Stress Relief Visualization', duration: 12, steps: ['Sit back in a comfortable position', 'Close your eyes and take a deep breath', 'Visualize a calming scene, like a beach or forest', 'Imagine the sounds, smells, and feel of the environment', 'Continue visualizing and breathing deeply'] },
  ];

  useEffect(() => {
    let timer;
    if (isMeditationStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsMeditationStarted(false);
      alert("Meditation session complete!");
    }
    return () => clearInterval(timer);
  }, [isMeditationStarted, timeLeft]);

  const startMeditation = () => {
    setTimeLeft(selectedMeditation.duration * 60);
    setIsMeditationStarted(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧘 Meditation for Mental Health 🧘</Text>
      <Text style={styles.subHeader}>Select a Session:</Text>

      <ScrollView style={styles.meditationList}>
        {meditations.map((meditation) => (
          <TouchableOpacity
            key={meditation.id}
            style={styles.meditationCard}
            onPress={() => {
              setSelectedMeditation(meditation);
              setIsMeditationStarted(false);
            }}
          >
            <Icon name="self-improvement" size={24} color="#2e6da4" style={styles.icon} />
            <View>
              <Text style={styles.meditationTitle}>{meditation.title}</Text>
              <Text style={styles.meditationDuration}>{meditation.duration} mins</Text>
            </View>
          </TouchableOpacity>
        ))}

        {selectedMeditation && (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseHeader}>{selectedMeditation.title}</Text>
            <Text style={styles.exerciseDuration}>Duration: {selectedMeditation.duration} mins</Text>

            <ScrollView style={styles.stepsContainer}>
              {selectedMeditation.steps.map((step, index) => (
                <View key={index} style={styles.stepCard}>
                  <Text style={styles.stepText}>{index + 1}. {step}</Text>
                </View>
              ))}
            </ScrollView>

            {isMeditationStarted ? (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Time Left: {formatTime()}</Text>
                <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={(selectedMeditation.duration * 60 - timeLeft) / (selectedMeditation.duration * 60)} color="#2e6da4" />
              </View>
            ) : (
              <TouchableOpacity style={styles.startButton} onPress={startMeditation}>
                <Text style={styles.startButtonText}>Start Meditation</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedMeditation(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fc',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2e6da4',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  meditationList: {
    flexGrow: 1,
  },
  meditationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  meditationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  meditationDuration: {
    fontSize: 16,
    color: '#777',
  },
  exerciseContainer: {
    backgroundColor: '#eaf3fb',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  exerciseHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e6da4',
    textAlign: 'center',
    marginBottom: 8,
  },
  exerciseDuration: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  stepsContainer: {
    maxHeight: 180,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    elevation: 1,
  },
  stepText: {
    fontSize: 18,
    color: '#333',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  timerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2e6da4',
  },
  startButton: {
    backgroundColor: '#2e6da4',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default MeditationPage;
