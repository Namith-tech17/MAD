import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { GameContext } from '../utils/GameContext';

export default function HomeScreen({ navigation }) {

  const { setMode, setCurrentLevel } = useContext(GameContext);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Text style={styles.title}>MAZE ESCAPE</Text>
      <Text style={styles.subtitle}>Can you survive the maze?</Text>

      {/* 🎮 LEVEL MODE */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => {
          setMode("LEVEL");
          navigation.navigate('Game');
        }}
      >
        <Text style={styles.playText}>🎮 LEVEL MODE</Text>
      </TouchableOpacity>

      {/* 📖 STORY MODE (UPDATED 🔥) */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => {
          setMode("STORY");
          setCurrentLevel(1); // start from level 1
          navigation.navigate('StoryLevels'); // ✅ go to level panel
        }}
      >
        <Text style={styles.playText}>📖 STORY MODE</Text>
      </TouchableOpacity>

      {/* HOW TO PLAY */}
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('Instructions')}
      >
        <Text style={styles.secondaryText}>📖 HOW TO PLAY</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>🔥 React Native Game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#00ffff',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  subtitle: {
    color: '#aaa',
    marginBottom: 40,
  },
  playButton: {
    backgroundColor: '#ff0055',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 10,
    marginBottom: 15,
  },
  playText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    borderColor: '#0ff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  secondaryText: {
    color: '#0ff',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    color: '#555',
  },
});