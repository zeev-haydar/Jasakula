import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Stack } from 'expo-router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useCategory } from '@/providers/CategoryProvider'



const SearchResultScreen = () => {
    const { query, category } = useLocalSearchParams();
    const router = useRouter();
    const { category: categoryContext } = useCategory();
    const title: string = categoryContext ? categoryContext.title : '';
    const description: string = categoryContext ? categoryContext.description : '';
    const image: any = categoryContext ? categoryContext.image : null;

    // console.log({ title, description, image });


    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: true, title: `${title ? title:query}`,
                headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25 },
                headerLeft: () => (
                    <Button onPress={() => router.replace('/search')} style={styles.button_container}>
                        <FontAwesomeIcon icon={faArrowLeft} color='#fff' size={20} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    </Button>

                ),
            }} />
            <View style={styles.content}>

                {category === 'true' ? (
                    <View style={styles.category_info}>
                        <View style={styles.image_container}>
                            <Image source={image} style={styles.image} resizeMode='cover' />

                        </View>
                        <Text style={styles.category_title}>{title}</Text>
                        <Text style={[styles.text, {fontSize: 10, textAlign: 'center', color: "#9f9f9f"}]}>{description}</Text>
                        
                    </View>
                ) : <Text>Search Result for {query}</Text>
                }
                
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
        paddingTop: 25,

    },
    category_title: {
        fontFamily: 'DM-Sans',
        fontWeight: '400',
        color: '#000',
        fontSize: 20,
        margin: 8,
    },
    text: {
        fontFamily: 'DM-Sans',
        fontWeight: '400',
        color: '#000',
    },
    category_info: {
        flex: 1,
        alignItems: 'center',
        maxHeight: 150
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    button_container: {
        width: 24,
        height: 30,
        justifyContent: 'center', // Center the icon vertically
        alignItems: 'center', // Center the icon horizontally

    },
    image_container: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})
export default SearchResultScreen