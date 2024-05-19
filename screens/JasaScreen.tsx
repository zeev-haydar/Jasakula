import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPrice } from '@/utils/formatting';

const JasaScreen = () => {
    const { slug } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Info jasa {slug}</Text>
                <View style={styles.information}>
                    <Text style={[styles.text, { fontWeight: '700' }]}>WAWAWAWA</Text>
                    <Text style={styles.text}>★ 5</Text>
                    <Text style={[styles.text, {color: '#9f9f9f'}]}>Menerima jasakuuuuuuu</Text>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default JasaScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        height: '100%'

    },
    judul: {

    },
    information: {
        flex:1,
        padding: 8,
        justifyContent: 'space-between',
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1,
        height: '100%'
    },
    text: {

    }
})