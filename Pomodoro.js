import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';

const Pomodoro = () => {
  // Timer states
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Mood Tracker states
  const [mood, setMood] = useState(null);

  // Sound object for the alarm
  const [sound, setSound] = useState(null);

  // Load the sound on mount
  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/sukoon.mp3')
      );
      setSound(sound);
    }
    loadSound();

    return () => {
      sound && sound.unloadAsync(); // Unload sound on component unmount
    };
  }, []);

  // Timer functionality with useEffect to handle countdown
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Functions to handle start/pause and reset
  const startPauseHandler = () => setIsRunning(!isRunning);
  const resetHandler = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  // Play alarm and alert when timer ends
  const handleTimerEnd = async () => {
    await sound.playAsync();
    Alert.alert("Time's up!", "Take a break and relax.");
  };

  // Stop alarm function
  const stopAlarmHandler = async () => {
    await sound.stopAsync();
  };

  // Format time in mm:ss
  const formatTime = (time) => `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;

  // Handle mood selection
  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    alert(`Mood selected: ${selectedMood}`);
  };

  return (
    <View style={styles.container}>
      {/* Pomodoro Timer Section */}
      <View style={styles.timerContainer}>
        <Text style={styles.header}>Pomodoro Timer</Text>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
        <View style={styles.buttonRow}>
          <Button title={isRunning ? "Pause" : "Start"} onPress={startPauseHandler} />
          <Button title="Reset" onPress={resetHandler} />
          <Button title="Stop Alarm" onPress={stopAlarmHandler} />
        </View>
      </View>

      {/* Mood Tracker Section */}
      <View style={styles.moodContainer}>
        <Text style={styles.header}>How are you feeling today?</Text>
        <View style={styles.moodButtons}>
          <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodSelect('Happy')}>
            <Text style={styles.moodText}>😊 Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodSelect('Neutral')}>
            <Text style={styles.moodText}>😐 Neutral</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodSelect('Sad')}>
            <Text style={styles.moodText}>😔 Sad</Text>
          </TouchableOpacity>
        </View>
        {mood && <Text style={styles.selectedMood}>You selected: {mood}</Text>}
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FB',
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  moodContainer: {
    alignItems: 'center',
    width: '100%',
  },
  moodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  moodButton: {
    backgroundColor: '#E8F1F2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  moodText: {
    fontSize: 16,
    color: '#333',
  },
  selectedMood: {
    fontSize: 18,
    color: '#555',
    marginTop: 20,
  },
});

export default Pomodoro;
