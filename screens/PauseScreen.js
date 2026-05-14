import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PauseScreen({ navigation }) {
  return (
    <View style={styles.overlay}>

      <View style={styles.card}>
        <Text style={styles.title}>⏸ Paused</Text>

        {/* Resume */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00cc66' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>▶ Resume</Text>
        </TouchableOpacity>

        {/* Restart */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ffaa00' }]}
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={styles.buttonText}>🔄 Restart</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00bfff' }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>⚙ Settings</Text>
        </TouchableOpacity>

        {/* Quit */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff0055' }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>🏠 Quit</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '80%',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },

  title: {
    color: '#00ffff',
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
  },

  button: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
