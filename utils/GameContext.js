import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [control, setControl] = useState('Buttons');
  const [difficulty, setDifficulty] = useState('Medium');
  const [sound, setSound] = useState(true);

  return (
    <GameContext.Provider
      value={{
        darkMode,
        setDarkMode,
        control,
        setControl,
        difficulty,
        setDifficulty,
        sound,
        setSound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};