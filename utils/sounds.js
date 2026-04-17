import Sound from 'react-native-sound';

Sound.setCategory('Playback');

// Correct way (use filename only, NOT require)
export const moveSound = new Sound('move.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) console.log('Move sound error', error);
});

export const winSound = new Sound('win.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) console.log('Win sound error', error);
});

export const loseSound = new Sound('lose.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) console.log('Lose sound error', error);
});