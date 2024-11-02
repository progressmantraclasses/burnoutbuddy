import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install expo-linear-gradient
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; // Ensure you have installed expo-vector-icons

const questions = [
  "1. How often do you feel happy?",
  "2. Do you often feel sad?",
  "3. How is your sleep quality?",
  "4. Do you feel anxious frequently?",
  "5. Do you find yourself easily irritated?",
  "6. How often do you socialize?",
  "7. Do you enjoy your daily activities?",
  "8. Do you feel hopeful about the future?",
  "9. Do you feel mentally exhausted?",
  "10. How often do you feel stressed?",
];

const answerOptions = [1, 2, 3, 4, 5];

const QnAPage = () => {
  const [responses, setResponses] = useState(Array(10).fill(3));
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleAnswerChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const analyzeResponses = () => {
    const totalScore = responses.reduce((acc, score) => acc + score, 0);

    let emotionalState = "Neutral";
    if (totalScore >= 40) emotionalState = "Happy 😊";
    else if (totalScore >= 30) emotionalState = "Content 😌";
    else if (totalScore >= 20) emotionalState = "Anxious 😟";
    else if (totalScore >= 10) emotionalState = "Sad 😔";
    else emotionalState = "Depressed 😢";

    setResult(emotionalState);
    setShowResult(true);
  };

  return (
    <LinearGradient colors={['#ffffff', '#e0e0f8']} style={styles.container}>

      {!showResult ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Test Your Mental Health</Text>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.questionText}>{question}</Text>
              <View style={styles.answerOptions}>
                {answerOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      responses[index] === option && styles.selectedOption,
                    ]}
                    onPress={() => handleAnswerChange(index, option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.submitButton} onPress={analyzeResponses}>
            <Text style={styles.submitButtonText}>Submit & Analyze</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Your Mental Health Report</Text>
          <Image source={require('./assets/success.png')} style={styles.resultImage} />
          <Text style={styles.resultText}>You are feeling: {result}</Text>
          <View style={styles.reportContainer}>
            <View style={styles.reportItem}>
              <AntDesign name="smile-circle" size={24} color="green" />
              <Text style={styles.reportText}>{result}</Text>
            </View>
            <Text style={styles.suggestion}>
              {result === "Happy 😊" && "Keep up the positivity and continue enjoying life!"}
              {result === "Content 😌" && "Stay consistent with your current routine and enjoy peaceful moments."}
              {result === "Anxious 😟" && "Consider taking time to relax and unwind. Deep breathing exercises may help."}
              {result === "Sad 😔" && "Try connecting with friends or loved ones and sharing your feelings."}
              {result === "Depressed 😢" && "Consider speaking to a mental health professional or reaching out to supportive friends or family."}
            </Text>
          </View>
          <TouchableOpacity style={styles.retakeButton} onPress={() => setShowResult(false)}>
            <Text style={styles.retakeButtonText}>Retake Test</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3f51b5',
  },
  scrollContainer: {
    paddingBottom: 2,
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 5, // Adds a shadow effect for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 1 }, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 5, // iOS shadow blur
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    color: '#333',
  },
  answerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 50,
    width: 50,
    alignItems: 'center',
    elevation: 2, // Adds a shadow effect for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 1 }, // iOS shadow offset
    shadowOpacity: 0.2, // iOS shadow opacity
    shadowRadius: 3, // iOS shadow blur
  },
  selectedOption: {
    backgroundColor: '#6200ee',
  },
  optionText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    elevation: 5, // Adds a shadow effect for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 1 }, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 5, // iOS shadow blur
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3f51b5',
  },
  resultImage: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  reportContainer: {
    backgroundColor: '#e0f7fa',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    marginVertical: 10,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reportText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#00796b',
  },
  suggestion: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    color: '#666',
  },
  retakeButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  retakeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default QnAPage;



