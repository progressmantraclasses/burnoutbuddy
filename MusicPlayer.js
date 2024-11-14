import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const audioTracks = [
    {
      title: 'Dandelions',
      artist: 'Ruth B.',
      source: require('./assets/Dandelions.mp3'),
      albumCover: require('./assets/sukoon.png'),
    },
    {
      title: 'Who Says',
      artist: 'Selena Gomez',
      source: require('./assets/Who Says.mp3'),
      albumCover: require('./assets/sukoon.png'),

    }
    ,
    {
      title: 'Ek Zindagi',
      artist: 'Sachin–Jigar , Taniska Sanghvi',
      source: require('./assets/Ek Zindagi.mp3'),
      albumCover: require('./assets/sukoon.png'),
    },
    {
      title: 'Millionaire',
      artist: 'Yo Yo Honey Singh',
      source: require('./assets/sukoon.mp3'),
      albumCover: require('./assets/sukoon.jpg'),
    },
    {
      title: 'party',
      artist: 'Relaxing Tunes',
      source: require('./assets/sukoon.mp3'),
      albumCover: require('./assets/sukoon.jpg'),
    },
    {
<<<<<<< HEAD
      title: 'Sunset Beats',
      artist: 'Sunshine Music',
      source: require('./assets/tadapna.mp3'),
      albumCover: require('./assets/sukoon.jpg'),
    },
    {
      title: 'Ocean Waves',
      artist: 'Nature Sounds',
      source: require('./assets/sukoon.mp3'),
      albumCover: require('./assets/sukoon.jpg'),
    },
=======
      title: 'Unstoppable',
      artist: 'Sia',
      source: require('./assets/Unstoppable.mp3'),
      albumCover: require('./assets/sukoon.png'),
    }
>>>>>>> 1741e65f2653290fcf4853bdb3b65e88a49ec97e
  ];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);

  const intervalRef = useRef(null);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      clearInterval(intervalRef.current);
    };
  }, [currentTrackIndex]);

  const loadAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: audioSound, status } = await Audio.Sound.createAsync(
      audioTracks[currentTrackIndex].source,
      { shouldPlay: true, volume }
    );

    setSound(audioSound);
    setTrackDuration(status.durationMillis / 1000); // Set track duration
    audioSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    setIsPlaying(true);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => (prev < trackDuration ? prev + 1 : prev));
    }, 1000);
  };

  const updatePlaybackStatus = (status) => {
    if (status.isPlaying) {
      setCurrentTime(status.positionMillis / 1000);
    }

    if (status.didJustFinish) {
      playNext(); // Automatically play the next track when the current track ends
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        clearInterval(intervalRef.current);
      } else {
        await sound.playAsync();
        startTimer();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  const handleSliderValueChange = async (value) => {
    setCurrentTime(value);
    if (sound) {
      await sound.setPositionAsync(value * 1000);
    }
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % audioTracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0); // Reset current time to 0 for the new track
  };

  const playPrevious = () => {
    const previousIndex =
      (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length;
    setCurrentTrackIndex(previousIndex);
    setCurrentTime(0); // Reset current time to 0 for the new track
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={audioTracks[currentTrackIndex].albumCover}
        style={styles.albumCover}
      />
      <Text style={styles.trackTitle}>{audioTracks[currentTrackIndex].title}</Text>
      <Text style={styles.artistName}>{audioTracks[currentTrackIndex].artist}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={playPrevious}>
          <Ionicons name="play-skip-back-circle" size={40} color="#4caf50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={{ marginHorizontal: 20 }}>
          {isPlaying ? (
            <Ionicons name="pause-circle" size={70} color="#4caf50" />
          ) : (
            <Ionicons name="play-circle" size={70} color="#4caf50" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext}>
          <Ionicons name="play-skip-forward-circle" size={40} color="#4caf50" />
        </TouchableOpacity>
      </View>

      <Slider
        style={styles.trackSlider}
        minimumValue={0}
        maximumValue={trackDuration}
        value={currentTime}
        onValueChange={handleSliderValueChange}
        minimumTrackTintColor="#4caf50"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#4caf50"
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(trackDuration)}</Text>
      </View>

      <Text style={styles.volumeLabel}>Volume</Text>
      <Slider
        style={styles.volumeSlider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={handleVolumeChange}
        minimumTrackTintColor="#4caf50"
        maximumTrackTintColor="#d3d3d3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#4caf50',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  albumCover: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  artistName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackSlider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  timeText: {
    color: '#333',
  },
  volumeLabel: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  volumeSlider: {
    width: '100%',
    height: 40,
  },
});

export default MusicPlayer;
