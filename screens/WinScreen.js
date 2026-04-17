import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WinScreen({ route, navigation }) {
  const score = route.params?.score || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 YOU WIN!</Text>

      <View style={styles.card}>
        <Text style={styles.score}>Final Score: {score}</Text>
        <Text style={styles.sub}>Amazing job! 🚀</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.btnText}>🔄 Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}>🏠 Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#000', justifyContent:'center', alignItems:'center' },

  title:{ color:'#0ff', fontSize:34, marginBottom:20 },

  card:{
    backgroundColor:'#111',
    padding:30,
    borderRadius:15,
    alignItems:'center',
    marginBottom:30
  },

  score:{ color:'#0f0', fontSize:22 },

  sub:{ color:'#aaa', marginTop:10 },

  btn:{
    backgroundColor:'#ff0055',
    padding:15,
    margin:10,
    borderRadius:10,
    width:200,
    alignItems:'center'
  },

  btnText:{ color:'#fff' }
});