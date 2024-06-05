import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#71BFD1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 25
      },
    }}
  >
  </Stack>
  )
}

export default _layout