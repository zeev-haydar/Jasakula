// search.tsx

import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import SearchScreen from '../../../screens/SearchScreen'

const Page = () => {
  

  return (
    <SearchScreen/>
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