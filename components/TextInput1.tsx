import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { GenericStyles } from '@/styles/generic'

const TextInput1 = ({ value, setValue, label, placeholder }) => {
    return (

        <TextInput
            label={
                <Text style={[GenericStyles.mainFont, { fontSize: 12 }]}>
                    {label}
                    <Text style={{ color: 'red' }}> *</Text>
                </Text>}
            style={styles.input}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={'#ccc'}
            onChangeText={setValue}
            onSubmitEditing={()=>console.log(value)}
            activeUnderlineColor='#71bfd1'
            underlineColor='transparent'
            defaultValue={value}
            contentStyle={[GenericStyles.mainFont]}
            
        />
    )
}

export default TextInput1

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 16,
        elevation: 2,
        textAlignVertical: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    inputWithoutMargin: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        elevation: 2,
        textAlignVertical: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

})