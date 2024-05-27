import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ChatsScreen from '@/screens/ChatsScreen'
import ChatScreen from '@/screens/ChatScreen'

const index = () => {
    return (
        <ChatScreen/>
    )
}

export default index

const styles = StyleSheet.create({})