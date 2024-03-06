import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(()=> {
    async function prepare() {
      try {
        fadeOut();
        // await new Promise(resolve => setTimeout(resolve, 3000));
      }
      catch (e) {
        console.warn(e);
      }
      finally {
        
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Animated.View style={{ opacity: fadeAnim }}>
    </Animated.View>
    <HomeScreen/>
    </SafeAreaView>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
