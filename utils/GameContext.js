import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {

  // ✅ EXISTING (UNCHANGED)
  const [darkMode, setDarkMode] = useState(true);
  const [control, setControl] = useState('Buttons');
  const [difficulty, setDifficulty] = useState('Medium');
  const [sound, setSound] = useState(true);

  // 🆕 MODE SYSTEM
  const [mode, setMode] = useState("LEVEL"); // LEVEL or STORY

  // 🆕 STORY SYSTEM
  const [hasKey, setHasKey] = useState(false);

  // 🆕 LEVEL PROGRESSION
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(1); // unlocked level

  // 🆕 LEVEL BASED DIFFICULTY (AUTO SCALE)
  const getDifficultyByLevel = () => {
    if (currentLevel <= 3) return "Easy";
    if (currentLevel <= 7) return "Medium";
    return "Hard";
  };

  // 🆕 NEXT LEVEL LOGIC
  const nextLevel = () => {
    const next = currentLevel + 1;
    setCurrentLevel(next);

    // unlock next level
    if (next > maxLevel) {
      setMaxLevel(next);
    }

    setHasKey(false); // reset key each level
  };

  // 🆕 RESET STORY
  const resetStory = () => {
    setCurrentLevel(1);
    setHasKey(false);
  };

  return (
    <GameContext.Provider
      value={{
        // ✅ EXISTING
        darkMode,
        setDarkMode,
        control,
        setControl,
        difficulty,
        setDifficulty,
        sound,
        setSound,

        // 🆕 MODE
        mode,
        setMode,

        // 🆕 STORY
        hasKey,
        setHasKey,

        // 🆕 LEVEL SYSTEM
        currentLevel,
        setCurrentLevel,
        maxLevel,
        setMaxLevel,
        nextLevel,
        resetStory,
        getDifficultyByLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};