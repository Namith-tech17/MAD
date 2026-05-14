import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { moveSound, winSound, loseSound } from '../utils/sounds';
import { generateMaze } from '../utils/mazeGenerator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameContext } from '../utils/GameContext';

export default function GameScreen({ navigation }) {

  const { sound, difficulty, darkMode, control } = useContext(GameContext);

  const [maze, setMaze] = useState(generateMaze());
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [enemy, setEnemy] = useState({ x: 4, y: 2 });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const enemyAnim = useRef(new Animated.Value(1)).current;

  const animatePlayer = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.25, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(enemyAnim, { toValue: 1.2, duration: 400, useNativeDriver: true }),
        Animated.timing(enemyAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    let speed = 700;

    if (difficulty === 'Easy') speed = 1000;
    if (difficulty === 'Hard') speed = 400;

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
  }, [player, maze, difficulty]);

  const updateStats = async (won = false) => {
    try {
      const data = await AsyncStorage.getItem('stats');

      let stats = data ? JSON.parse(data) : {
        games: 0,
        wins: 0,
        bestScore: 0,
        time: 0,
      };

      stats.games += 1;
      if (won) stats.wins += 1;
      if (score > stats.bestScore) stats.bestScore = score;

      await AsyncStorage.setItem('stats', JSON.stringify(stats));
    } catch (e) {
      console.log('Stats error', e);
    }
  };

  const resetPosition = () => {
    setPlayer({ x: 1, y: 1 });
    setEnemy({ x: 4, y: 2 });
  };

  const loseLife = () => {
    if (sound) loseSound.play();

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

    if (cell !== 1) {
      if (sound) moveSound.play();

      animatePlayer();
      setPlayer({ x, y });

      if (cell === 3) loseLife();

      if (cell === 2) {
        if (sound) winSound.play();

        const newScore = score + 100;
        setScore(newScore);

        updateStats(true);

        setMaze(generateMaze());
        resetPosition();
      }

      if (x === enemy.x && y === enemy.y) loseLife();
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: darkMode ? '#050505' : '#ffffff' }
    ]}>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={[styles.hudText, { color: darkMode ? '#0ff' : '#000' }]}>
          ❤️ {lives}
        </Text>

        <Text style={[styles.hudText, { color: darkMode ? '#0ff' : '#000' }]}>
          💰 {score}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Pause')}>
          <Text style={[styles.pause, { color: darkMode ? '#fff' : '#000' }]}>
            ⏸
          </Text>
        </TouchableOpacity>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {maze.map((row, y) => (
          <View key={y} style={{ flexDirection: 'row' }}>
            {row.map((cell, x) => {
              let color = '#111';

              if (cell === 1) color = '#ff0055';
              if (cell === 2) color = '#00ffcc';
              if (cell === 3) color = '#ff3b3b';

              if (enemy.x === x && enemy.y === y) {
                return (
                  <Animated.View
                    key={x}
                    style={[
                      styles.cell,
                      { backgroundColor: '#ff00ff', transform: [{ scale: enemyAnim }] },
                    ]}
                  />
                );
              }

              if (player.x === x && player.y === y) {
                return (
                  <Animated.View
                    key={x}
                    style={[
                      styles.cell,
                      styles.player,
                      { transform: [{ scale: scaleAnim }] },
                    ]}
                  />
                );
              }

              return <View key={x} style={[styles.cell, { backgroundColor: color }]} />;
            })}
          </View>
        ))}
      </View>

      {/* Controls */}
      {control === 'Buttons' ? (
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => movePlayer('UP')}>
            <Text style={[styles.btn, { color: darkMode ? '#fff' : '#000' }]}>⬆️</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => movePlayer('LEFT')}>
              <Text style={[styles.btn, { color: darkMode ? '#fff' : '#000' }]}>⬅️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => movePlayer('RIGHT')}>
              <Text style={[styles.btn, { color: darkMode ? '#fff' : '#000' }]}>➡️</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => movePlayer('DOWN')}>
            <Text style={[styles.btn, { color: darkMode ? '#fff' : '#000' }]}>⬇️</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.controls}>
          <View style={styles.joystick}>
            <TouchableOpacity onPress={() => movePlayer('UP')}>
              <Text style={styles.joyBtn}>⬆️</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => movePlayer('LEFT')}>
                <Text style={styles.joyBtn}>⬅️</Text>
              </TouchableOpacity>

              <View style={{ width: 40 }} />

              <TouchableOpacity onPress={() => movePlayer('RIGHT')}>
                <Text style={styles.joyBtn}>➡️</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => movePlayer('DOWN')}>
              <Text style={styles.joyBtn}>⬇️</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Bottom */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Game')}>
          <Text style={styles.smallBtn}>🔄 Restart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
          <Text style={styles.smallBtn}>📊 Stats</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
    backgroundColor: '#111',
  },

  hudText: { color: '#0ff' },

  pause: { color: '#fff' },

  gameArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  cell: { width: 55, height: 55, margin: 3, borderRadius: 6 },

  player: { backgroundColor: '#ffff00' },

  controls: { alignItems: 'center' },

  btn: { fontSize: 32, color: '#fff', margin: 10 },

  joystick: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },

  joyBtn: {
    fontSize: 28,
    margin: 10,
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },

  smallBtn: { color: '#aaa' },
});