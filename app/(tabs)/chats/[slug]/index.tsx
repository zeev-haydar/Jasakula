import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ChatsScreen from '@/screens/ChatsScreen'

const index = () => {
    return (
        <ChatsScreen/>
    )
}

export default index

const styles = StyleSheet.create({})