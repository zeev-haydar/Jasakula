import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import { useRouter } from 'expo-router'

const HomeCard = ({ title, source = require('../assets/images/placeholder.png') }) => {

    const router = useRouter()

    const handlePressCard = (title) => {
        router.navigate({pathname:`/search/search_result`, params: {query: title, category: 'false'}})
    }
    return (
        <TouchableOpacity style={styles.container} onPress={()=>handlePressCard(title)}>
                <Image
                    style={{ width: 80, height: 80 }}
                    source={source}
                />
                <Text style={styles.title}>
                    {title}
                </Text>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: '#fff',
        // borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    title: {
        fontFamily: 'DM-Sans',
        padding: 8,
        width: '100%',
        fontSize: 12
    }
}

)

export default HomeCard