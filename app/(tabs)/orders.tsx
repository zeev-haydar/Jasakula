import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

const Page = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Orders" }} />
      <Text>index of Orders page</Text>
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