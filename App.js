import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GameProvider } from './utils/GameContext';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import WinScreen from './screens/WinScreen';
import PauseScreen from './screens/PauseScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';
import StoryLevelScreen from './screens/StoryLevelScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Pause" component={PauseScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="GameOver" component={GameOverScreen} />
          <Stack.Screen name="Win" component={WinScreen} />
          <Stack.Screen name="Instructions" component={InstructionsScreen} />
          <Stack.Screen name="Stats" component={StatsScreen} />
          <Stack.Screen name="StoryLevels" component={StoryLevelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}