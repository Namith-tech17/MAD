import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function StoreScreen({ navigation, route }) {
  const { score, setScore, setLives, setShield } = route.params;
  const [coins, setCoins] = useState(score);

  const buyHeart = () => {
    if (coins >= 100) {
      setCoins(coins - 100);
      setScore(prev => prev - 100);
      setLives(prev => prev + 1);
      Alert.alert('Purchased', '❤️ Extra life added!');
    } else {
      Alert.alert('Not enough coins', 'You need 100 coins.');
    }
  };

  const buyShield = () => {
    if (coins >= 150) {
      setCoins(coins - 150);
      setScore(prev => prev - 150);
      setShield(prev => prev + 1);
      Alert.alert('Purchased', '🛡️ Shield added!');
    } else {
      Alert.alert('Not enough coins', 'You need 150 coins.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Store</Text>
      <Text style={styles.coins}>💰 Coins: {coins}</Text>

      <View style={styles.card}>
        <Text style={styles.item}>❤️ Extra Heart</Text>
        <Text style={styles.desc}>Adds 1 life</Text>
        <Text style={styles.cost}>Cost: 100 coins</Text>
        <TouchableOpacity style={styles.buyBtn} onPress={buyHeart}>
          <Text style={styles.buyText}>Buy Heart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.item}>🛡️ Shield</Text>
        <Text style={styles.desc}>Protects from one enemy/trap hit</Text>
        <Text style={styles.cost}>Cost: 150 coins</Text>
        <TouchableOpacity style={styles.buyBtn} onPress={buyShield}>
          <Text style={styles.buyText}>Buy Shield</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#0ff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  coins: {
    fontSize: 22,
    color: '#ff0',
    marginBottom: 25,
  },
  card: {
    width: '90%',
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#0ff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  item: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 8,
  },
  desc: {
    color: '#aaa',
    marginBottom: 8,
    textAlign: 'center',
  },
  cost: {
    color: '#ff0',
    marginBottom: 15,
  },
  buyBtn: {
    backgroundColor: '#0ff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buyText: {
    color: '#000',
    fontWeight: 'bold',
  },
  back: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});