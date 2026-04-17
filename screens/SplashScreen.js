import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { transform: [{ scale }] }]}>
        MAZE ESCAPE
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#000', justifyContent:'center', alignItems:'center' },
  title:{ color:'#0ff', fontSize:36, fontWeight:'bold' }
});