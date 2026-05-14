import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { generateMaze } from '../utils/mazeGenerator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameContext } from '../utils/GameContext';

export default function GameScreen({ navigation }) {

  const {
    difficulty,
    control,
    mode,
    hasKey,
    setHasKey,
    currentLevel,
    nextLevel
  } = useContext(GameContext);

  const getMazeSize = () => {
    if (mode === "STORY") return 5 + currentLevel;
    return 6;
  };

  const [maze, setMaze] = useState(generateMaze(getMazeSize()));
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [enemy, setEnemy] = useState({ x: 4, y: 2 });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const enemyAnim = useRef(new Animated.Value(1)).current;
  const bombAnim = useRef(new Animated.Value(1)).current;

  // PLAYER ANIMATION
  const animatePlayer = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.3, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // ENEMY PULSE
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(enemyAnim, { toValue: 1.2, duration: 400, useNativeDriver: true }),
        Animated.timing(enemyAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // 💣 BOMB PULSE
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bombAnim, { toValue: 1.2, duration: 300, useNativeDriver: true }),
        Animated.timing(bombAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // ENEMY MOVEMENT
  useEffect(() => {
    let speed = 700;

    if (mode === "STORY") {
      speed = Math.max(200, 900 - currentLevel * 50);
    } else {
      if (difficulty === 'Easy') speed = 1000;
      if (difficulty === 'Hard') speed = 400;
    }

    const interval = setInterval(() => {
      setEnemy(prev => {
        let x = prev.x;
        let y = prev.y;

        if (player.x > x) x++;
        else if (player.x < x) x--;

        if (player.y > y) y++;
        else if (player.y < y) y--;

        if (!maze[y] || maze[y][x] === undefined) return prev;
        if (maze[y][x] !== 1) return { x, y };

        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [player, maze, difficulty, currentLevel, mode]);

  const updateStats = async (won = false) => {
    try {
      const data = await AsyncStorage.getItem('stats');
      let stats = data ? JSON.parse(data) : { games: 0, wins: 0, bestScore: 0 };

      stats.games += 1;
      if (won) stats.wins += 1;
      if (score > stats.bestScore) stats.bestScore = score;

      await AsyncStorage.setItem('stats', JSON.stringify(stats));
    } catch (e) {}
  };

  const resetPosition = () => {
    setPlayer({ x: 1, y: 1 });
    setEnemy({ x: 4, y: 2 });
  };

  const loseLife = () => {
    if (lives > 1) {
      setLives(l => l - 1);
      resetPosition();
    } else {
      updateStats(false);
      navigation.navigate('GameOver', { score });
    }
  };

  const movePlayer = (dir) => {
    let { x, y } = player;

    if (dir === 'UP') y--;
    if (dir === 'DOWN') y++;
    if (dir === 'LEFT') x--;
    if (dir === 'RIGHT') x++;

    if (!maze[y] || maze[y][x] === undefined) return;

    const cell = maze[y][x];

    if (cell === 4) {
      setHasKey(true);
      maze[y][x] = 0;
    }

    if (cell === 5 && mode === "STORY" && !hasKey) return;

    if (cell === 5 && mode === "STORY" && hasKey) {
      maze[y][x] = 0;
    }

    if (cell !== 1) {
      animatePlayer();
      setPlayer({ x, y });

      if (cell === 3) loseLife();

      if (cell === 2) {
        if (mode === "STORY" && !hasKey) return;

        setScore(score + 100);
        updateStats(true);

        if (mode === "STORY") nextLevel();

        const newMaze = generateMaze(5 + currentLevel + 1);

        if (mode === "STORY") {
          newMaze[2][2] = 4;
          newMaze[newMaze.length - 3][newMaze.length - 2] = 5;
        }

        setMaze(newMaze);
        resetPosition();
        setHasKey(false);
      }

      if (x === enemy.x && y === enemy.y) loseLife();
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Text style={styles.topText}>❤️ {lives}</Text>
        <Text style={styles.topText}>💰 {score}</Text>
        {mode === "STORY" && <Text style={styles.topText}>🎯 {currentLevel}</Text>}
        {mode === "STORY" && <Text style={styles.topText}>🔑 {hasKey ? "YES" : "NO"}</Text>}
      </View>

      <View style={styles.gameArea}>
        {maze.map((row, y) => (
          <View key={y} style={{ flexDirection: 'row' }}>
            {row.map((cell, x) => {

              let color = '#0c0c0c';
              if (cell === 1) color = '#962727';

              // 💣 TRAP
              if (cell === 3) {
                return (
                  <Animated.View key={x} style={[styles.cell, styles.iconCell, { transform: [{ scale: bombAnim }] }]}>
                    <Text style={styles.bombIcon}>💣</Text>
                  </Animated.View>
                );
              }

              // 🔑 KEY
              if (cell === 4) {
                return (
                  <View key={x} style={[styles.cell, styles.iconCell]}>
                    <Text style={styles.keyIcon}>🔑</Text>
                  </View>
                );
              }

              // 🌀 GOAL
              if (cell === 2) {
                return (
                  <View key={x} style={[styles.cell, styles.iconCell]}>
                    <Text style={styles.goalIcon}>🌀</Text>
                  </View>
                );
              }

              // 👾 ENEMY
              if (enemy.x === x && enemy.y === y) {
                return (
                  <Animated.View key={x} style={[styles.cell, styles.iconCell, { transform: [{ scale: enemyAnim }] }]}>
                    <Text style={styles.enemyIcon}>👾</Text>
                  </Animated.View>
                );
              }

              // 🟢 PLAYER
              if (player.x === x && player.y === y) {
                return (
                  <Animated.View key={x} style={[styles.cell, styles.iconCell, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.playerIcon}>🟢</Text>
                  </Animated.View>
                );
              }

              return <View key={x} style={[styles.cell, { backgroundColor: color }]} />;
            })}
          </View>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => movePlayer('UP')}>
          <Text style={styles.btn}>⬆️</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => movePlayer('LEFT')}>
            <Text style={styles.btn}>⬅️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => movePlayer('RIGHT')}>
            <Text style={styles.btn}>➡️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => movePlayer('DOWN')}>
          <Text style={styles.btn}>⬇️</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0c0c' },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#0b0b0b',
    borderBottomWidth: 2,
    borderColor: '#00eaff',
  },

  topText: {
    color: '#00bcd4',
    fontWeight: 'bold',
  },

  gameArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  cell: {
    width: 50,
    height: 50,
    margin: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f0f0f',
  },

  iconCell: { justifyContent: 'center', alignItems: 'center' },

  playerIcon: {
    fontSize: 28,
    textShadowColor: '#00eaff',
    textShadowRadius: 12,
  },

  enemyIcon: {
    fontSize: 28,
    textShadowColor: '#ff00cc',
    textShadowRadius: 10,
  },

  keyIcon: {
    fontSize: 24,
    textShadowColor: '#ffd700',
    textShadowRadius: 10,
  },

  goalIcon: {
    fontSize: 26,
    textShadowColor: '#00fff7',
    textShadowRadius: 12,
  },

  bombIcon: {
    fontSize: 26,
    textShadowColor: '#ff3b3b',
    textShadowRadius: 12,
  },

  controls: { alignItems: 'center', marginBottom: 20 },

  btn: {
    fontSize: 32,
    margin: 10,
    color: '#00bcd4',
  },
});
