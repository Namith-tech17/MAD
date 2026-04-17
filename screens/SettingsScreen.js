import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';

import { GameContext } from '../utils/GameContext';

export default function SettingsScreen({ navigation }) {

  const {
    sound,
    setSound,
    difficulty,
    setDifficulty,
    control,
    setControl,
    darkMode,
    setDarkMode,
  } = useContext(GameContext);

  // keep music local
  const [musicEnabled, setMusicEnabled] = useState(false);

  // 🔊 Sound
  const toggleSound = (value) => {
    setSound(value);
  };

  // 🎵 Music (local only)
  const toggleMusic = (value) => {
    setMusicEnabled(value);
  };

  // 🎯 Difficulty
  const changeDifficulty = (level) => {
    setDifficulty(level);
  };

  // 🎮 Control Style
  const changeControl = (type) => {
    setControl(type);
  };

  // 🌙 Dark Mode
  const toggleDarkMode = (value) => {
    setDarkMode(value);
  };

  // 🔄 Reset
  const resetSettings = () => {
    setSound(true);
    setDifficulty('Medium');
    setControl('Buttons');
    setDarkMode(true);
    setMusicEnabled(false);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>⚙ Settings</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 🔊 Sound */}
        <View style={styles.card}>
          <Text style={styles.label}>🔊 Sound</Text>
          <Switch value={sound} onValueChange={toggleSound} />
        </View>

        {/* 🎵 Music */}
        <View style={styles.card}>
          <Text style={styles.label}>🎵 Background Music</Text>
          <Switch value={musicEnabled} onValueChange={toggleMusic} />
        </View>

        {/* 🎯 Difficulty */}
        <View style={styles.card}>
          <Text style={styles.label}>🎯 Difficulty</Text>
          <View style={styles.options}>
            {['Easy', 'Medium', 'Hard'].map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionBtn,
                  difficulty === level && styles.active
                ]}
                onPress={() => changeDifficulty(level)}
              >
                <Text style={styles.optionText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 🎮 Controls */}
        <View style={styles.card}>
          <Text style={styles.label}>🎮 Controls</Text>
          <View style={styles.options}>
            {['Buttons', 'Joystick'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionBtn,
                  control === type && styles.active
                ]}
                onPress={() => changeControl(type)}
              >
                <Text style={styles.optionText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 🌙 Dark Mode */}
        <View style={styles.card}>
          <Text style={styles.label}>🌙 Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        {/* 🔄 Reset */}
        <TouchableOpacity style={styles.resetBtn} onPress={resetSettings}>
          <Text style={styles.resetText}>🔄 Reset Settings</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Back */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingTop: 50,
    alignItems: 'center',
  },

  title: {
    color: '#00ffff',
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  card: {
    width: '90%',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  label: {
    color: '#0ff',
    marginBottom: 10,
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  optionBtn: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },

  active: {
    backgroundColor: '#ff0055',
    borderColor: '#ff0055',
  },

  optionText: {
    color: '#fff',
  },

  resetBtn: {
    backgroundColor: '#ffaa00',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  resetText: {
    color: '#000',
    fontWeight: 'bold',
  },

  backBtn: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#ff0055',
    padding: 15,
    borderRadius: 20,
  },

  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});