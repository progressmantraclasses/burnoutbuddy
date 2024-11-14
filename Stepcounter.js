import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ProgressBarAndroid, Button, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

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
    // Assign weights to factors
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
      <Text style={styles.header}>Mental Health Analysis</Text>

      {/* Screen Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Screen Time</Text>
        <Text style={styles.sectionContent}>{screenTime}</Text>
      </View>

      {/* Phone Unlocks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phone Unlocks</Text>
        <Text style={styles.sectionContent}>{unlocks} times</Text>
      </View>

      {/* Social App Usage Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Usage by Category</Text>
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="usage"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        {Object.entries(categorizedData).map(([category, time], index) => (
          <Text key={index} style={styles.sectionContent}>
            {category}: {Math.floor(time / 60)}h {time % 60}m
          </Text>
        ))}
      </View>

      {/* Burnout Monitor Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Burnout Monitor</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={burnoutLevel}
          color="#ff6347"
        />
        <Text style={styles.burnoutLevel}>
          Burnout Level: {(burnoutLevel * 100).toFixed(0)}%
        </Text>
        <Button title="Analyze Burnout" onPress={calculateBurnout} />
      </View>

      {/* Tips to Reduce Burnout */}
      {burnoutLevel >= 0.7 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips to Reduce Burnout</Text>
          <Text style={styles.tip}>1. Take regular short breaks while working.</Text>
          <Text style={styles.tip}>2. Limit screen time, especially before bedtime.</Text>
          <Text style={styles.tip}>3. Engage in physical activities like a short walk.</Text>
          <Text style={styles.tip}>4. Disconnect from social media for a few hours daily.</Text>
          <Text style={styles.tip}>5. Practice mindfulness or meditation to reduce stress.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
  },
  burnoutLevel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  tip: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Dashboard;
