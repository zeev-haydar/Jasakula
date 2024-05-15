import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';
import BigTitle from '../components/BigTitle';
import Vector1 from '../assets/styling/vector_1.svg'



/**
 * The Home Screen
 * @returns 
 */
export default function HomeScreen() {
  const user = "Danang";
  return (
    <View style={styles.container}>
      <View style={styles.background_vector}>
        <Vector1/>
      </View>
      <View style={styles.screen}>
        <Stack.Screen options={{ headerShown: true, headerTransparent:true, title: `Selamat Datang, ${user}` ,
      headerTitleStyle:{fontFamily: 'DM-Sans', fontWeight:'bold'}}} />
        <Text>Welcome to Jasakula! App for Freelancers</Text>
        <StatusBar style="auto" />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  background_vector: {
    zIndex: -1,
    position: 'absolute',
    left: 0,
    top: 0,
    
  },
  screen: {
    
    
  }
});