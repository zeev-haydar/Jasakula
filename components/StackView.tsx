import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StackView = ({ children, flex=0 }) => {

    const styles = StyleSheet.create({
        container: {
            flex: flex,
            backgroundColor: '#fff',
        },
        element: {
            position: 'absolute',
            top: 0,
            left: 0,
        },
    })
    return (
        <View style={styles.container}>
            {React.Children.map(children, (child, index) => (
                React.cloneElement(child, {
                    style: [child.props.style, styles.element, { zIndex: index + 1 }]
                  })
            ))}
        </View>
    )
}

export default StackView

