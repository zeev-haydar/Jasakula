import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
    const [text, setText] = React.useState("")
    return (
            <TextInput
                value={text}
                placeholder='Cari Jasa'
                onChangeText={(text) => setText(text)}
                left={<TextInput.Icon icon={() => <Icon name="search" size={24} />} />}
                underlineColor='transparent'
                style={{
                    height: 40,
                    backgroundColor: '#FFF',
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                }}
            />
    )
}

export default SearchBar