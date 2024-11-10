// screens/Dashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import moment from 'moment';

const Dashboard = () => {
  const [screenTimeData, setScreenTimeData] = useState([]);
  const [unlockCount, setUnlockCount] = useState(0);
  const [goal, setGoal] = useState(5); // Default daily goal in hours

  useEffect(() => {
    // Simulate fetching data
    fetchScreenTimeData();
  }, []);

  const fetchScreenTimeData = () => {
    setScreenTimeData([2, 4, 3, 6, 7, 5, 4]);
    setUnlockCount(50);
  };

  const checkGoal = () => {
    const totalScreenTime = screenTimeData.reduce((a, b) => a + b, 0) / 7; // average daily time
    if (totalScreenTime > goal) {
      Alert.alert("Goal Alert", "You've exceeded your daily screen time goal!");
    }
  };

  const renderHealthTips = () => {
    return (
      <View style={styles.tipsContainer}>
        <Text style={styles.tipTitle}>Health Tips</Text>
        <Text style={styles.tipText}>• Avoid using your phone an hour before bed.</Text>
        <Text style={styles.tipText}>• Take regular breaks to prevent eye strain.</Text>
        <Text style={styles.tipText}>• Practice deep breathing for a mental refresh.</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Summary Section */}
      <Text style={styles.title}>Summary & Quick Stats</Text>
      <Text style={styles.stat}>Daily Screen Time Goal: {goal} hours</Text>
      <Text style={styles.stat}>Weekly Unlock Count: {unlockCount}</Text>

      {/* Line Chart for Weekly Screen Time */}
      <Text style={styles.title}>Weekly Screen Time</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: screenTimeData }],
        }}
        width={340}
        height={220}
        yAxisLabel="Hrs"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Pie Chart for App Usage Breakdown */}
      <Text style={styles.title}>App Usage Breakdown</Text>
      <PieChart
        data={[
          { name: 'Social', usage: 4, color: 'tomato', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Work', usage: 6, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Entertainment', usage: 3, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Others', usage: 2, color: 'gold', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        ]}
        width={340}
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
      />

      {/* Goal and Reminder Section */}
      <Text style={styles.title}>Set Daily Screen Time Goal</Text>
      <View style={styles.goalContainer}>
        <Button title="Check Goal Status" onPress={checkGoal} />
      </View>

      {/* Health Tips Section */}
      {renderHealthTips()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  stat: { fontSize: 16, color: '#333', marginBottom: 5 },
  chart: { marginVertical: 20 },
  goalContainer: { marginBottom: 20 },
  tipsContainer: { padding: 10, marginTop: 20, backgroundColor: '#f0f4f7', borderRadius: 10 },
  tipTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  tipText: { fontSize: 14, color: '#555' },
});

export default Dashboard;
