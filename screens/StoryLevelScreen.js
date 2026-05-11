import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GameContext } from '../utils/GameContext';

export default function StoryLevelScreen({ navigation }) {

  const { setMode, setCurrentLevel, maxLevel } = useContext(GameContext);

  const levels = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>SELECT LEVEL</Text>

      <View style={styles.grid}>
        {levels.map((lvl) => {
          const unlocked = lvl <= maxLevel;

          return (
            <TouchableOpacity
              key={lvl}
              style={[styles.levelBox, !unlocked && styles.locked]}
              disabled={!unlocked}
              onPress={() => {
                setMode("STORY");
                setCurrentLevel(lvl); // ✅ FIXED
                navigation.navigate("Game");
              }}
            >
              <Text style={styles.levelText}>
                {unlocked ? lvl : "🔒"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#0ff',
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  levelBox: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  locked: {
    backgroundColor: '#222',
  },

  levelText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});