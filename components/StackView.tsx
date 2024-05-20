import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StackView = ({ children }) => {
    return (
        <View style={styles.container}>
            {React.Children.map(children, (child, index) => (
                <View key={index} style={{ ...styles.element, zIndex: index + 1 }}>
                    {child}
                </View>
            ))}
        </View>
    )
}

export default StackView

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
    },
    element: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
})