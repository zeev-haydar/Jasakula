import { View, Text, StyleSheet, ScrollView} from 'react-native'
import Vector1 from '../assets/styling/vector_1.svg'
import React from 'react'
import { Stack, useNavigationContainerRef, useNavigation, useRouter, useLocalSearchParams, Link } from 'expo-router';
import { SearchBar } from '../components/search_bar';
import CategoryElement from '../components/CategoryElement';
import { useCategory } from '../providers/CategoryProvider';
import CategoryElementWithLink from '@/components/CategoryElementWithLink';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
    const router = useRouter();
    const navigation = useNavigation
    const catProvider = useCategory()

    const [text, setText] = React.useState("")

    const handleSearch = () => {
        catProvider.changeCategory(null)
        router.push({pathname:`/search/search_result`, params: {query: text, category: 'false'}});
    };
    return (
        <SafeAreaView style={styles.container}>
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
                            description={"After Effect, Premiere Pro, Sony Vegas Pro, Sony Vegas Noob, Capcut, Jedag Jedug Tiktok."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-google-code-500.png')}
                            title={"Web Development"}
                            description={"Front-end Developer, Back-end Developer, Center-end Developer, Software Engineer, DevOps Engineer."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-wacom-tablet-100.png')}
                            title={"Desain Logo"}
                            description={"Create a logo design for personal use or commercial use."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-exhibitor-100.png')}
                            title={"Digital Marketing"}
                            description={"If you like buggati and want to get rich? you can check freelancer here."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-cash-in-hand-100.png')}
                            title={"Akuntansi & Keuangan"}
                            description={"Kamu miskin karena suami anda main judi online? tingkatkan kesadaran keunganan keluarga melalui layanan ini."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-multiple-devices-100.png')}
                            title={"Servis Barang Elektronik"}
                            description={"AC Rusak, Kulkas Rusak, Kipas Rusak, TV Rusak? bisa cari servis di sini. Tidak melayani kemalingan."}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-yoga-100.png')}
                            title={"Gaya Hidup"}
                            description={"Get a better life style"}
                        />
                        <CategoryElementWithLink
                            source={require('@/assets/images/icons8-consultation-100.png')}
                            title={"Jasa Konsultasi"}
                            description={"You can consult here"}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 20


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
        fontFamily: 'DMSans_700Bold',
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