import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Vector1 from '../assets/styling/vector_1.svg'
import React from 'react'
import { Stack, useNavigationContainerRef, useNavigation, useRouter, useLocalSearchParams, Link } from 'expo-router';
import { SearchBar } from '../components/search_bar';
import CategoryElement from '../components/CategoryElement';
import { useCategory } from '../providers/CategoryProvider';
import CategoryElementWithLink from '@/components/CategoryElementWithLink';

const SearchScreen = () => {
    const router = useRouter();
    const catProvider = useCategory()

    const [text, setText] = React.useState("")

    const handleSearch = () => {
        console.log("dienter")
        catProvider.changeCategory(null)
        router.push(`/search_result?query=${text}&category=false`);
    };
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: false, headerTransparent: true, title: `Cari Jasa`,
                headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25 }
            }} />

            <View style={styles.background_vector}>
                <Vector1 />
            </View>
            <View style={styles.content}>
                <View style={styles.search_bar}>
                    <SearchBar onSubmitEditing={handleSearch} text={text} onChangeText={text => setText(text)} />
                </View>

                <Text style={styles.category_text}>Kategori</Text>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.category_list}>
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-body-100.png')}
                            title={"3D & Animasi"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-video-100.png')}
                            title={"Video Editing"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-google-code-500.png')}
                            title={"Web Development"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-wacom-tablet-100.png')}
                            title={"Desain Logo"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-exhibitor-100.png')}
                            title={"Digital Marketing"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-cash-in-hand-100.png')}
                            title={"Akuntansi & Keuangan"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-multiple-devices-100.png')}
                            title={"Servis Barang Elektronik"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-yoga-100.png')}
                            title={"Gaya Hidup"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-consultation-100.png')}
                            title={"Jasa Konsultasi"}
                            description={"Modeling, animasi, texturing, rigging, pencahayaan, rendering, compositing."}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 50


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
        // marginLeft: 17,
        // marginRight: 17,
        // alignItems: 'center'
        width: '100%'

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
        width: '100%'
    },
    scrollViewContent: {
        flexGrow: 1,
        width: '100%'
    },
})

export default SearchScreen