import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';

/**
 * The Home Screen
 * @returns 
 */
export default function HomeScreen() {
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Home" }} />
      <Text>Welcome to Jasakula! App for Freelancers</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});