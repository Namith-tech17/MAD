import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function InstructionsScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>🎮 How to Play</Text>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Objective</Text>
          <Text style={styles.text}>
            Reach the <Text style={styles.green}>GREEN</Text> block to complete the level.
          </Text>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎮 Controls</Text>
          <Text style={styles.text}>⬆️ ⬇️ ⬅️ ➡️ Move using arrows</Text>
        </View>

        {/* Card 3 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚠️ Avoid</Text>
          <Text style={styles.text}>🟥 Traps (lose life)</Text>
          <Text style={styles.text}>🟪 Enemy (game over)</Text>
        </View>

        {/* Card 4 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Goal</Text>
          <Text style={styles.text}>Complete all levels and win!</Text>
        </View>

      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>⬅ Back</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingTop: 50,
  },

  title: {
    color: '#00ffff',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
  },

  cardTitle: {
    color: '#0ff',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  text: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },

  green: {
    color: '#00ffcc',
    fontWeight: 'bold',
  },

  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#ff0055',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});