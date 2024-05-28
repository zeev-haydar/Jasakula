import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const FirstStack = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#71BFD1',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontFamily: 'DM-Sans',
                    fontSize: 25
                },
            }}
        />
    )
}

export default FirstStack