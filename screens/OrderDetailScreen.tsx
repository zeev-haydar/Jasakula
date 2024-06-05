import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GenericStyles } from '@/styles/generic'
import StackHeader from '@/components/StackHeader'
import { useLocalSearchParams } from 'expo-router'

const OrderDetailScreen = () => {
    const {slug} = useLocalSearchParams();
    return (
        <View style={GenericStyles.container}>
            <StackHeader title={"Detail Pesanan"} />
            <Text>OrderDetailScreen {slug}</Text>
        </View>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({})