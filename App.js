import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import QnAPage from './QnAPage';
import MusicPlayer from './MusicPlayer';
import WebcamPage from './WebcamPage';
import DietPlan from './DietPlan';
import Dashboard from './Dashboard';
import MeditationPage from './MeditationPage';
import Stepcounter from './Stepcounter';
import Pomodoro from './Pomodoro';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Reusable Option Card Component
const OptionCard = ({ title, imageUri, onPress, backgroundColor }) => {
  return (
    <View style={[styles.taskContainer, { backgroundColor }]}>
      <Text style={styles.taskTitle}>{title}</Text>
      <View style={styles.taskRow}>
        <TouchableOpacity onPress={onPress} style={styles.clickButton}>
          <Text style={styles.clickMe}>Click Now</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: imageUri }}
          style={[styles.taskImage, { backgroundColor: 'transparent' }]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

// Main Home Screen Component
const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Welcome back, Shivam!</Text>
      <Text style={styles.howAreYou}>How are you feeling today?</Text>

      <View style={styles.moodOptions}>
        {['Happy', 'Calm', 'Relax', 'Focused', 'Stressed'].map((mood, index) => (
          <TouchableOpacity key={index} style={styles.moodButton}>
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <OptionCard
        title="Test Your Mental Health with QnA"
        imageUri="https://cdn.pixabay.com/photo/2020/07/14/17/44/mental-health-5405065_1280.png"
        onPress={() => navigation.navigate('MentalHealthQnA')}
        backgroundColor="#f3e5f5"
      />
      <OptionCard
        title="Mental Health Analysis AI"
        imageUri="https://cdn.pixabay.com/photo/2023/10/18/20/11/man-8325036_1280.png"
        onPress={() => navigation.navigate('MentalHealthAI')}
        backgroundColor="#e1bee7"
      />
      <OptionCard
        title="Relax with Music"
        imageUri="https://cdn.pixabay.com/photo/2016/03/23/17/26/music-note-1275177_1280.png"
        onPress={() => navigation.navigate('MusicRelax')}
        backgroundColor="#c5cae9"
      />
      <OptionCard
        title="Dashboard for Burnout Person"
        imageUri="https://cdn.pixabay.com/photo/2018/04/03/00/48/fingers-3285615_1280.png"
        onPress={() => navigation.navigate('BurnoutDashboard')}
        backgroundColor="#b3e5fc"
      />
      <OptionCard
        title="Meditation"
        imageUri="https://cdn.pixabay.com/photo/2024/03/29/21/17/man-8663658_1280.png"
        onPress={() => navigation.navigate('Meditation')}
        backgroundColor="#b2dfdb"
      />
      <OptionCard
        title="Diet Plan for Mental Health"
        imageUri="https://cdn.pixabay.com/photo/2013/07/13/01/22/vegetables-155616_1280.png"
        onPress={() => navigation.navigate('DietPlan')}
        backgroundColor="#dcedc8"
      />
       <OptionCard
        title="Pomodoro technique for Mental Health"
        imageUri="https://cdn.pixabay.com/photo/2013/07/13/01/22/vegetables-155616_1280.png"
        onPress={() => navigation.navigate('Pomodoro')}
        backgroundColor="#dcedc8"
      />
    </ScrollView>
  );
};

// Drawer Navigation
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: styles.burnoutBuddyTitle,
      }}
    >
   <Drawer.Screen
      name="Burnout Buddy"
      component={HomeScreen}
      options={{
        title: 'Burnout Buddy',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('./assets/2ment.jpg')}
              style={styles.profileImage}
            />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen name="MentalHealthQnA" component={QnAPage} options={{ title: 'Mental Health QnA' }} />
      <Drawer.Screen name="MentalHealthAI" component={WebcamPage} options={{ title: 'Mental Health AI Analysis' }} />
      <Drawer.Screen name="MusicRelax" component={MusicPlayer} options={{ title: 'Relax with Music' }} />
      <Drawer.Screen name="BurnoutDashboard" component={Dashboard} options={{ title: 'Burnout Dashboard' }} />
      <Drawer.Screen name="Meditation" component={MeditationPage} options={{ title: 'Meditation' }} />
      <Drawer.Screen name="DietPlan" component={DietPlan} options={{ title: 'Diet Plan' }} />
      <Drawer.Screen name="Pomodoro" component={Pomodoro} options={{ title: 'Pomodoro Timer' }} />
    </Drawer.Navigator>
  );
};

// Placeholder Screen for Additional Pages
const PlaceholderScreen = ({ route }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{route.name} Page</Text>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MusicRelax" component={MusicPlayer} />
        <Stack.Screen name="MentalHealthQnA" component={QnAPage} />
        <Stack.Screen name="MentalHealthAI" component={WebcamPage} />
        <Stack.Screen name="DietPlan" component={DietPlan} />
        <Stack.Screen name="Pomodoro" component={Pomodoro} />
        <Stack.Screen name="BurnoutDashboard" component={Dashboard} />
        <Stack.Screen name="Meditation" component={MeditationPage} />
         <Stack.Screen name="Stepcounter" component={Stepcounter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// StyleSheet with updated styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  burnoutBuddyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#333',
    textAlign: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  howAreYou: {
    fontSize: 16,
    marginBottom: 10,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  moodButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
  },
  moodText: {
    fontSize: 14,
  },
  taskContainer: {
    backgroundColor: '#f3e5f5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clickButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 10,
  },
  clickMe: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskImage: {
    width: 100,
    height: 100,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
