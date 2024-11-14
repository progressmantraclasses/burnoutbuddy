import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons'; // Add icons for enhanced UI

// Function to categorize app usage
const categorizeAppUsage = (appName) => {
  if (['Instagram', 'Facebook', 'TikTok'].includes(appName)) {
    return 'Social';
  } else if (['YouTube', 'Netflix', 'Spotify'].includes(appName)) {
    return 'Entertainment';
  } else if (['Google News', 'CNN', 'BBC'].includes(appName)) {
    return 'News';
  } else {
    return 'Other';
  }
};

const Dashboard = () => {
  const [screenTime, setScreenTime] = useState('6h 45m');
  const [unlocks, setUnlocks] = useState(90);
  const [socialAppUsage, setSocialAppUsage] = useState([
    { name: 'Instagram', time: '1h 45m' },
    { name: 'WhatsApp', time: '2h 15m' },
    { name: 'YouTube', time: '1h 30m' }
  ]);

  const [burnoutLevel, setBurnoutLevel] = useState(0.4);
  const [riskStatus, setRiskStatus] = useState('Low');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Function to parse time string and convert to minutes
  const parseTimeToMinutes = (time) => {
    if (time && time.includes('h') && time.includes('m')) {
      const [hours, minutes] = time.split(' ');
      const hoursInMinutes = parseInt(hours.split('h')[0]) * 60;
      const mins = parseInt(minutes.split('m')[0]);
      return hoursInMinutes + mins;
    } else if (time && time.includes('m')) {
      return parseInt(time.split('m')[0]);
    } else {
      return 0;
    }
  };

  // Categorize social app usage data
  const categorizedData = socialAppUsage.reduce((acc, app) => {
    const category = categorizeAppUsage(app.name);
    const usageTime = parseTimeToMinutes(app.time);

    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += usageTime;
    return acc;
  }, {});

  // Calculate Burnout Score
  const calculateBurnout = () => {
    const maxScreenTime = 360; // max healthy screen time (6 hours)
    const maxUnlocks = 80; // max healthy unlocks per day
    const socialTime = categorizedData['Social'] || 0;
    const entertainmentTime = categorizedData['Entertainment'] || 0;

    // Weights
    const screenTimeWeight = parseTimeToMinutes(screenTime) / maxScreenTime;
    const unlockWeight = unlocks / maxUnlocks;
    const socialWeight = socialTime / 120; // consider 2 hours max for social
    const entertainmentWeight = entertainmentTime / 90; // consider 1.5 hours max for entertainment

    // Burnout calculation formula
    let score = 0.4 * screenTimeWeight + 0.3 * unlockWeight + 0.2 * socialWeight + 0.1 * entertainmentWeight;
    score = Math.min(1, Math.max(0, score)); // Clamp between 0 and 1

    setBurnoutLevel(score);

    // Determine Risk Status and Feedback
    if (score >= 0.7) {
      setRiskStatus('High');
      setFeedbackMessage('⚠️ Your burnout risk is high! It’s time to take action. Reduce screen time, take more frequent breaks, and engage in offline activities.');
    } else if (score >= 0.4) {
      setRiskStatus('Moderate');
      setFeedbackMessage('⚠️ Your burnout risk is moderate. Consider managing your notifications and engaging in relaxing activities.');
    } else {
      setRiskStatus('Low');
      setFeedbackMessage('😊 Your burnout risk is low! Great job maintaining a healthy digital lifestyle. Keep it up!');
    }
  };

  // Data for Pie Chart - Categorized Usage
  const chartData = Object.keys(categorizedData).map((category, index) => ({
    name: category,
    usage: categorizedData[category],
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  }));

  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>📊 Mental Health Dashboard</Text>
        <Icon name="happy-outline" size={30} color="#fff" />
      </View>

      {/* Screen Time Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="time-outline" size={24} color="#4A90E2" />
          <Text style={styles.cardTitle}>Daily Screen Time</Text>
        </View>
        <Text style={styles.cardContent}>{screenTime}</Text>
      </View>

      {/* Phone Unlocks Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="lock-open-outline" size={24} color="#FF8C00" />
          <Text style={styles.cardTitle}>Phone Unlocks</Text>
        </View>
        <Text style={styles.cardContent}>{unlocks} times</Text>
      </View>

      {/* Social App Usage Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="apps-outline" size={24} color="#50E3C2" />
          <Text style={styles.cardTitle}>App Usage by Category</Text>
        </View>
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#2b5876',
            backgroundGradientTo: '#4e4376',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="usage"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        {Object.entries(categorizedData).map(([category, time], index) => (
          <Text key={index} style={styles.cardContent}>
            {category}: {Math.floor(time / 60)}h {time % 60}m
          </Text>
        ))}
      </View>

      {/* Burnout Monitor Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="alert-circle-outline" size={24} color="#FF6347" />
          <Text style={styles.cardTitle}>Burnout Monitor</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${burnoutLevel * 100}%` }]} />
        </View>
        <Text style={styles.burnoutLevel}>
          Burnout Level: {(burnoutLevel * 100).toFixed(0)}% ({riskStatus} Risk)
        </Text>
        <TouchableOpacity style={styles.analyzeButton} onPress={calculateBurnout}>
          <Text style={styles.analyzeButtonText}>Analyze Burnout</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="chatbubble-ellipses-outline" size={24} color="#F5A623" />
          <Text style={styles.cardTitle}>Personalized Feedback</Text>
        </View>
        <Text style={styles.feedback}>{feedbackMessage}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  headerContainer: {
    backgroundColor: '#4e4376',
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  burnoutLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  analyzeButton: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    borderRadius: 8,
  },
  analyzeButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});

export default Dashboard;
