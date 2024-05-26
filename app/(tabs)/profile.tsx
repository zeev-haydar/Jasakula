import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Button } from 'react-native-paper'

const Page = () => {
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Profile" }} />
      <Text>index of Profile page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Page