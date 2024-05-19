import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const JasaScreen = () => {
    const { slug } = useLocalSearchParams();

    return (
        <View>
            <Text>Info jasa {slug}</Text>
        </View>
    )
}

export default JasaScreen

const styles = StyleSheet.create({})