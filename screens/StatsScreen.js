import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatsScreen({ navigation }) {

  const [stats, setStats] = useState({
    games: 0,
    wins: 0,
    bestScore: 0,
    time: 0,
  });

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    loadStats();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadStats = async () => {
    try {
      const data = await AsyncStorage.getItem('stats');
      if (data) setStats(JSON.parse(data));
    } catch (e) {
      console.log('Stats load error', e);
    }
  };

  return (
    <View style={styles.container}>

      <Animated.View style={{ opacity: fadeAnim }}>

        <Text style={styles.title}>📊 Game Stats</Text>

        <View style={styles.card}>
          <Text style={styles.item}>🎮 Games Played</Text>
          <Text style={styles.value}>{stats.games}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>🏆 Wins</Text>
          <Text style={styles.value}>{stats.wins}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>💰 Best Score</Text>
          <Text style={styles.value}>{stats.bestScore}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>⏱ Time Played</Text>
          <Text style={styles.value}>{stats.time}s</Text>
        </View>

      </Animated.View>

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
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#00ffff',
    fontSize: 32,
    marginBottom: 30,
    fontWeight: 'bold',
  },

  card: {
    width: 260,
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },

  item: {
    color: '#aaa',
    fontSize: 16,
  },

  value: {
    color: '#0ff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },

  backBtn: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#ff0055',
    padding: 15,
    borderRadius: 20,
  },

  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});