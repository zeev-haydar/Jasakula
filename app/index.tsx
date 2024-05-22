import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'
import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';

// SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontsError] = useFonts({
    'DM-Sans': require('@/assets/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf')
  })

  useEffect(() => {
    async function prepare() {
      try {
        console.log("this was printed")
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
    if (appIsReady && (fontsLoaded || fontsError)) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontsError]);

  if (!appIsReady) {
    return null;
  }
  if (!fontsLoaded) return null

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Animated.View style={{ opacity: fadeAnim }}>
        </Animated.View>
      </View>
      <Redirect href={"/(tabs)/home"} />
    </>



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
