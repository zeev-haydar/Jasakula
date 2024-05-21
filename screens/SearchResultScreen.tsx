import { View, Text, StyleSheet, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Stack } from 'expo-router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useCategory } from '@/providers/CategoryProvider'
import SearchResultCard from '@/components/SearchResultCard'
import Jasa from '@/models/Jasa'
import { useFocusEffect } from 'expo-router';
import SearchResultCardWithLink from '@/components/SearchResultCardWithLink'
import { useJasa } from '@/providers/JasaProvider'
import { supabase } from '@/utils/supabase'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { printAllElements } from '@/utils/formatting'
import Penjual from '@/models/Penjual'
import Pengguna from '@/models/Pengguna'
import Ulasan from '@/models/Ulasan'



const SearchResultScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { query, category } = useLocalSearchParams();
    const router = useRouter();
    const { category: categoryContext } = useCategory();
    const title: string = categoryContext ? categoryContext.title : '';
    const description: string = categoryContext ? categoryContext.description : '';
    const image: any = categoryContext ? categoryContext.image : null;
    // console.log({query, category})

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response: PostgrestSingleResponse<{ jasa: any[]; kategori: { name: any }[] }[]>;
                if (category === 'true') {
                    response = await supabase
                        .from('jasakategori')
                        .select(`
                            jasa(*,
                                ulasan(*,
                                    pengguna: pengguna_id(id, full_name)
                                ),
                                penjual: penjual_id(
                                    *,
                                    pengguna: pengguna_id(id, full_name)
                                )
                            ),
                            kategori!inner(
                                name
                            )`).eq("kategori.name", query);
                }
                if (response.error) {
                    console.log(response.error)
                    throw response.error
                };
                setData(response.data);
                printAllElements(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, [query, category])

    const templateJasa = Jasa.CreateTemplateJasa(require('@/assets/images/placeholder-design.png'));
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (router.canGoBack()) {
                    router.back()
                    return true;
                }
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [router])
    );



    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: true, title: `${title ? title : query}`,
                headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25},
                headerLeft: () => (
                    <Button onPress={() => router.back()} style={styles.button_container}>
                        <FontAwesomeIcon icon={faArrowLeft} color='#fff' size={20} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    </Button>

                ),
            }} />
            <View style={styles.content}>

                {category === 'true' ? (
                    <View>
                        <View style={styles.category_info}>
                            <View style={styles.image_container}>
                                <Image source={image} style={styles.image} resizeMode='cover' />

                            </View>
                            <Text style={styles.category_title}>{title}</Text>
                            <Text style={[styles.text, { fontSize: 10, textAlign: 'center', color: "#9f9f9f" }]}>{description}</Text>
                        </View>

                    </View>

                ) : <Text>Search Result for {query}</Text>
                }
                <View style={styles.search_results}>
                {loading ? (
                        <Text style={[styles.text, { fontSize: 15, textAlign: 'center', color: "#9f9f9f" }]}>Loading...</Text>
                    ) : error ? (
                        <Text style={[styles.text, { fontSize: 15, textAlign: 'center', color: "#9f9f9f" }]}>{error}</Text>
                    ) : data.length === 0 ? (
                        <Text style={[styles.text, { fontSize: 15, textAlign: 'center', color: "#9f9f9f" }]}>Result not found</Text>
                    ) : (
                        data.map((item, index) => {
                            const jasa = item.jasa;
                            if (jasa) {
                                const penjual = jasa.penjual || {};
                                const pengguna = penjual.pengguna || {};
                                return (
                                    <SearchResultCardWithLink
                                        key={index}
                                        source={require('@/assets/images/placeholder-design.png')}
                                        jasa={new Jasa(
                                            jasa.id,
                                            jasa.nama,
                                            jasa.deskripsi,
                                            jasa.rating,
                                            jasa.harga,
                                            jasa.jenis,
                                            new Penjual(
                                                penjual.id,
                                                new Pengguna(pengguna.id, pengguna.full_name, null, null)
                                            ),
                                            null,
                                            jasa.ulasan.map((item: { id: string; sent_at: string; content: string; rating: number; pengguna: { id: string; full_name: string } })=>{
                                                new Ulasan(item.id, item.sent_at, item.content, item.rating, new Pengguna(item.pengguna.id, item.pengguna.full_name, null, null))
                                            }
                                            )
                                        )}
                                    />
                                );
                            }
                            return null;
                        })
                    )}
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',

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
        alignItems: 'center',
        marginBottom: 20
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
    search_results: {
        marginHorizontal: 4,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'

    },
})
export default SearchResultScreen