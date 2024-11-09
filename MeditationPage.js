// src/MeditationPage.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ProgressBarAndroid, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const MeditationPage = ({ navigation }) => {
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isMeditationStarted, setIsMeditationStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef();

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
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < selectedMeditation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("You have completed all the steps!");
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const scrollToExerciseDetails = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: height / 3, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧘 Meditation for Mental Health 🧘</Text>
      <Text style={styles.subHeader}>Select a Session:</Text>

      <ScrollView style={styles.meditationList} ref={scrollViewRef}>
        <TouchableOpacity
          style={styles.nextStepButton}
          onPress={() => navigation.navigate('Stepcounter')}
        >
          <Text style={styles.nextStepButtonText}>Go to Step Tracker</Text>
        </TouchableOpacity>
        
        {meditations.map((meditation) => (
          <TouchableOpacity
            key={meditation.id}
            style={styles.meditationCard}
            onPress={() => {
              setSelectedMeditation(meditation);
              setIsMeditationStarted(false);
              scrollToExerciseDetails();
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
              {selectedMeditation.steps.slice(0, currentStep + 1).map((step, index) => (
                <View key={index} style={styles.stepCard}>
                  <Text style={styles.stepText}>
                    {index + 1}. {step}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {isMeditationStarted ? (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Time Left: {formatTime()}</Text>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={(selectedMeditation.duration * 60 - timeLeft) / (selectedMeditation.duration * 60)}
                  color="#2e6da4"
                />
              </View>
            ) : (
              <TouchableOpacity style={styles.startButton} onPress={startMeditation}>
                <Text style={styles.startButtonText}>Start Meditation</Text>
              </TouchableOpacity>
            )}

            {isMeditationStarted && currentStep < selectedMeditation.steps.length && (
              <TouchableOpacity style={styles.nextStepButton} onPress={nextStep}>
                <Text style={styles.nextStepButtonText}>Next Step</Text>
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
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  header: {
    fontSize: width < 350 ? 24 : 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2e6da4',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: width < 350 ? 16 : 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
  },
  meditationList: {
    marginBottom: 20,
  },
  meditationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    elevation: 1,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  meditationTitle: {
    fontSize: width < 350 ? 16 : 18,
    fontWeight: 'bold',
    color: '#2e6da4',
  },
  meditationDuration: {
    fontSize: width < 350 ? 12 : 14,
    color: '#555',
  },
  exerciseContainer: {
    marginTop: 20,
  },
  exerciseHeader: {
    fontSize: width < 350 ? 20 : 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2e6da4',
    marginBottom: 10,
  },
  exerciseDuration: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  stepsContainer: {
    maxHeight: height * 0.3,
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
  startButton: {
    backgroundColor: '#2e6da4',
    paddingVertical: 12,
    paddingHorizontal: width * 0.2,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextStepButton: {
    backgroundColor: '#2e6da4',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  nextStepButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#aaa',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MeditationPage;
