import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, Redirect } from 'expo-router';
import { useNavigation } from 'expo-router';

const SearchBar = ({ onSubmitEditing = () => { } , onChangeText, text}) => {
    


    return (
        <TextInput
            value={text}
            placeholder='Cari Jasa'
            onChangeText={onChangeText}
            left={<TextInput.Icon icon={() => <Icon name="search" size={16} />} />}
            underlineColor='transparent'
            activeUnderlineColor='transparent'
            cursorColor='#71bfd1'
            placeholderTextColor={'#C4C4C4'}
            onSubmitEditing={onSubmitEditing}
            style={{
                height: 30,
                backgroundColor: '#FFF',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                fontFamily: "DM-Sans",
                fontSize: 12
            }}
        />
    )
}

export { SearchBar}