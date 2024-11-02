// Dashboard.js

import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

const Dashboard = () => {
  // Mood Tracker State
  const [mood, setMood] = useState('Neutral');
  const moods = ['Happy', 'Sad', 'Anxious', 'Excited', 'Calm'];

  // Daily Tasks
  const tasks = [
    'Practice mindfulness meditation for 10 minutes',
    'Go for a 20-minute walk',
    'Write down three things you are grateful for',
  ];

  // Relaxation Resources
  const resources = [
    'Guided Meditation App: Calm',
    'Breathing Exercises: Headspace',
    'Yoga Videos: YouTube',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mental Health Dashboard</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Mood Tracker */}
        <View style={styles.card}>
          <Text style={styles.title}>Mood Tracker</Text>
          <Text style={styles.moodText}>Current Mood: {mood}</Text>
          {moods.map((item) => (
            <Button key={item} title={item} onPress={() => setMood(item)} />
          ))}
        </View>

        {/* Daily Tasks */}
        <View style={styles.card}>
          <Text style={styles.title}>Daily Tasks</Text>
          {tasks.map((task, index) => (
            <Text key={index} style={styles.taskText}>
              - {task}
            </Text>
          ))}
        </View>

        {/* Relaxation Resources */}
        <View style={styles.card}>
          <Text style={styles.title}>Relaxation Resources</Text>
          {resources.map((resource, index) => (
            <Text key={index} style={styles.resourceText}>
              - {resource}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moodText: {
    fontSize: 16,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  resourceText: {
    fontSize: 16,
  },
});

export default Dashboard;
