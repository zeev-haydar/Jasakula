import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Stack } from 'expo-router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const SearchResultScreen = () => {
    const { keyword } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: true, title: `${keyword}`,
                headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25 },
                headerLeft: () => (
                        <Button onPress={() => router.replace('/search')} style={styles.button_container}> 
                            <FontAwesomeIcon icon={faArrowLeft} color='#fff' size={20} style={{justifyContent: 'center', alignItems: 'center'}} />
                        </Button>

                ),
            }} />
            <View style={styles.content}>
                <Text>Search Result for {keyword}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,


    },
    background_vector: {
        zIndex: -1,
        position: 'absolute',
        left: 0,
        top: 0,

    },
    content: {
        flex: 1,
        // justifyContent: 'center',
        flexDirection: 'column',
        // marginTop: 95,
        marginLeft: 17,
        marginRight: 17,

    },
    category_text: {
        fontFamily: 'DM-Sans',
        fontWeight: '700',
        color: '#fff',
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 37
    },
    search_bar: {
        marginLeft: 17,
        marginRight: 17,
        paddingBottom: 20
    },
    category_list: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    button_container: {
        width: 24,
        height: 30,
        justifyContent: 'center', // Center the icon vertically
        alignItems: 'center', // Center the icon horizontally

    }
})
export default SearchResultScreen