import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const DietPlan = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [budget, setBudget] = useState('');
  const [calories, setCalories] = useState(0);
  const [dietPlan, setDietPlan] = useState([]);

  // Extended list of foods with mental health benefits, calories, and cost per serving in INR
  const foods = [
    { id: '1', name: 'Almonds', calories: 200, benefit: 'Reduces stress', cost: 20 },
    { id: '2', name: 'Salmon', calories: 250, benefit: 'Boosts mood with omega-3s', cost: 200 },
    { id: '3', name: 'Dark Chocolate', calories: 150, benefit: 'Improves mood', cost: 50 },
    { id: '4', name: 'Blueberries', calories: 80, benefit: 'Supports brain health', cost: 30 },
    { id: '5', name: 'Green Tea', calories: 0, benefit: 'Calms the mind', cost: 15 },
    { id: '6', name: 'Peanut Butter', calories: 180, benefit: 'Reduces anxiety', cost: 10 },
    { id: '7', name: 'Bananas', calories: 90, benefit: 'Improves mood with potassium', cost: 5 },
    { id: '8', name: 'Oatmeal', calories: 150, benefit: 'Good for stress relief', cost: 10 },
    { id: '9', name: 'Greek Yogurt', calories: 100, benefit: 'Helps digestion, boosts mood', cost: 30 },
    { id: '10', name: 'Avocado', calories: 160, benefit: 'High in healthy fats', cost: 50 },
    { id: '11', name: 'Chickpeas', calories: 120, benefit: 'Rich in protein, boosts mood', cost: 8 },
    { id: '12', name: 'Spinach', calories: 20, benefit: 'Reduces anxiety', cost: 5 },
    { id: '13', name: 'Sweet Potatoes', calories: 100, benefit: 'High in fiber', cost: 15 },
    { id: '14', name: 'Eggs', calories: 70, benefit: 'High in protein', cost: 5 },
    { id: '15', name: 'Brown Rice', calories: 110, benefit: 'Promotes mental clarity', cost: 12 },
    { id: '16', name: 'Oranges', calories: 50, benefit: 'Vitamin C for stress reduction', cost: 10 },
    { id: '17', name: 'Walnuts', calories: 200, benefit: 'High in omega-3s', cost: 50 },
    { id: '18', name: 'Chia Seeds', calories: 120, benefit: 'Reduces anxiety', cost: 30 },
    { id: '19', name: 'Turkey', calories: 200, benefit: 'High in tryptophan', cost: 150 },
    { id: '20', name: 'Quinoa', calories: 110, benefit: 'High in protein', cost: 20 },
    { id: '21', name: 'Broccoli', calories: 30, benefit: 'Boosts mental clarity', cost: 10 },
  ];

  const calculateCalories = () => {
    const weightInKg = parseFloat(weight);
    const recommendedCalories = Math.round(25 * weightInKg); // Simple calorie estimation
    setCalories(recommendedCalories);
    generateDietPlan(recommendedCalories, parseFloat(budget));
  };

  const generateDietPlan = (calorieLimit, dailyBudget) => {
    const selectedFoods = [];
    let remainingCalories = calorieLimit;
    let remainingBudget = dailyBudget;

    for (const food of foods) {
      if (food.calories <= remainingCalories && food.cost <= remainingBudget) {
        selectedFoods.push(food);
        remainingCalories -= food.calories;
        remainingBudget -= food.cost;
      }
    }

    setDietPlan(selectedFoods);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🧠 Mental Health Diet Guide</Text>

      <Text style={styles.label}>Enter your height (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Height in cm"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.label}>Enter your weight (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Weight in kg"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Enter your daily budget (₹):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Budget for entire day in INR"
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity style={styles.button} onPress={calculateCalories}>
        <Text style={styles.buttonText}>Calculate & Get Diet Plan</Text>
      </TouchableOpacity>

      {calories > 0 && (
        <Text style={styles.caloriesText}>Recommended Daily Calorie Intake: {calories} kcal</Text>
      )}

      <Text style={styles.subHeader}>🍽️ Recommended Foods per day</Text>
      <FlatList
        data={dietPlan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodInfo}>
              {item.calories} kcal - {item.benefit} - ₹{item.cost}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => <Text style={styles.emptyMessage}>No foods available within this budget and calorie range.</Text>}
      />

      <Text style={styles.subHeader}>📋 Available Mental Health food</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.allFoodItem}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodInfo}>
            {item.calories} kcal - {item.benefit} - ₹{item.cost}

            </Text>
          </View>
        )}
      />

      <Text style={styles.footer}>💡 Top 10 Tips for Mental Health</Text>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipText}>1. Prioritize sleep for better mood and resilience.</Text>
        <Text style={styles.tipText}>2. Maintain regular physical activity.</Text>
        <Text style={styles.tipText}>3. Practice mindfulness and meditation daily.</Text>
        <Text style={styles.tipText}>4. Stay hydrated to support brain function.</Text>
        <Text style={styles.tipText}>5. Limit alcohol and avoid smoking.</Text>
        <Text style={styles.tipText}>6. Cultivate positive social connections.</Text>
        <Text style={styles.tipText}>7. Take breaks to manage stress effectively.</Text>
        <Text style={styles.tipText}>8. Practice gratitude and journal regularly.</Text>
        <Text style={styles.tipText}>9. Spend time outdoors to improve mood.</Text>
        <Text style={styles.tipText}>10. Seek help when overwhelmed—mental health support is essential.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eaf4f4' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#007a7a', textAlign: 'center', marginVertical: 20 },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007a7a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  caloriesText: { fontSize: 18, color: '#555', textAlign: 'center', marginVertical: 15 },
  subHeader: { fontSize: 22, fontWeight: 'bold', marginVertical: 15, color: '#007a7a' },
  foodItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#007a7a' },
  foodInfo: { fontSize: 14, color: '#666' },
  emptyMessage: { textAlign: 'center', color: '#999' },
  allFoodItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footer: { fontSize: 18, fontWeight: 'bold', marginVertical: 20, color: '#007a7a' },
  tipsContainer: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, marginVertical: 10 },
  tipText: { fontSize: 14, marginBottom: 5, color: '#333' },
});

export default DietPlan;
