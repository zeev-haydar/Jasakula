import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import ChatsScreen from '@/screens/ChatsScreen'

const Page = () => {
  

  return (
    <ChatsScreen/>
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