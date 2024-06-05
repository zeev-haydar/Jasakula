import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GenericStyles } from '@/styles/generic'
import { TextInput } from 'react-native-paper'

const TextInput2 = ({ value, setValue, label, placeholder=''}) => {
    return (
        <TextInput
            label={
                <Text style={[GenericStyles.normalText, { fontSize: 12 }]}>
                    {label}
                    <Text style={{ color: 'red' }}> *</Text>
                </Text>}
            style={[GenericStyles.input, { height: 125, overflow: 'scroll' }]}
            onChangeText={setValue}
            onBlur={() => console.log(value+": "+value)}
            multiline
            numberOfLines={4}
            placeholder={placeholder}
            value={value}
            textAlignVertical='top'
            underlineColor='transparent'
            activeUnderlineColor='#71bfd1'
            contentStyle={[GenericStyles.mainFont]}
        />
    )
}

export default TextInput2

const styles = StyleSheet.create({})