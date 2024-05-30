import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const HomeCard = ({ title }) => {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 80, height: 80 }}
                source={require('../assets/images/placeholder.png')}
            />
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
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