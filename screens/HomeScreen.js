import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Text style={styles.title}>MAZE ESCAPE</Text>
      <Text style={styles.subtitle}>Can you survive the maze?</Text>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.playText}>▶ PLAY</Text>
      </TouchableOpacity>

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
    marginBottom: 20,
  },
  playText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    borderColor: '#0ff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
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