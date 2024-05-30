import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPrice, printAllElements } from '@/utils/formatting';
import { useJasa } from '@/providers/JasaProvider';
import StackView from '@/components/StackView';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from 'react-native-paper';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '@/utils/supabase';

const JasaScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTimeout, setIsTimeout] = useState(false);

    const { slug } = useLocalSearchParams();

    const router = useRouter();

    const { jasa: jasaContext } = useJasa();
    const { changeJasa } = useJasa();

    const imagePath = jasaContext && jasaContext.imagePath ? jasaContext.imagePath : require('@/assets/images/placeholder-design.png'); // use template image
    const screenWidth = Dimensions.get('window').width;

    const fetchData = async () => {
        console.log(slug);
        setLoading(true);
        setIsTimeout(false);

        const timeoutId = setTimeout(() => {
            setIsTimeout(true);
            setLoading(false);
        }, 10000); // 10 detik

        try {
            let response = await supabase
                .from('jasa')
                .select(`
                    *,
                    penjual(*,
                        pengguna: pengguna_id(
                            id, full_name, nickname
                        )
                    )
                `).eq('id', slug);

            if (response.error) {
                console.log(response.error)
                throw response.error;
            }

            clearTimeout(timeoutId); // Clear timeout jika fetch berhasil

            console.log("Done fetching")
            setData(response.data);
            // printAllElements(response.data); // untuk debugging
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [slug]);

    // Set image container height proportional to screen width (16:9 ratio)
    const imageHeight = (9 / 16) * screenWidth;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <Stack.Screen options={{
                headerShown: false
            }} />
            {loading ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>
                    {isTimeout ? "Mencapai timeout. coba lagi" : "Loading..."}
                </Text>
            ) : error ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>{error}</Text>
            ) : data.length === 0 ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>Result not found</Text>
            ) : (<ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>

                    <View style={[styles.stackContainer, { height: imageHeight }]}>
                        <StackView>
                            <View style={[styles.imageContainer, { height: imageHeight, width: screenWidth }]}>
                                <Image source={imagePath} style={styles.image} resizeMode='cover' />
                            </View>
                            <Button onPress={() => { router.back(); changeJasa(null); }} style={styles.button}>
                                <FontAwesomeIcon icon={faArrowLeft} color='#fff' size={20} style={{ justifyContent: 'center', }} />
                            </Button>
                        </StackView>
                    </View>

                    {/* <Text>Info jasa {slug}</Text> */}
                    <View style={styles.content}>
                        <View style={styles.information}>
                            {React.Children.map([
                                <Text style={[styles.text, styles.nama]} key="nama">{data[0].nama}</Text>,
                                <Text style={[styles.text, styles.rating]} key="rating">★ {Math.round(data[0].rating*100)/100}</Text>,
                                <Text style={[styles.text, styles.deskripsi]} key="deskripsi">{data[0].deskripsi}</Text>,
                            ], child => (
                                React.cloneElement(child, { style: [child.props.style, { paddingBottom: 8 }] })
                            ))}
                        </View>
                        <View style={styles.penjual}>
                            <View style={styles.penjualProfile}>
                                <View style={{ marginRight: 8, backgroundColor: '#000', padding: 4, borderRadius: 128 }}>
                                    <FontAwesomeIcon icon={faUser} size={16} color='#71BFD1' />
                                </View>

                                <Text style={[styles.text, styles.rating]}>{data[0].penjual?.pengguna?.full_name ? data[0].penjual.pengguna.full_name : "No Name"}</Text>
                            </View>
                            <Button style={styles.chatFreelancerButton}>
                                <Text style={[styles.text, { fontSize: 10, color: '#71BFD1', fontWeight: 'bold' }]}>Chat Freelancer</Text>
                            </Button>
                        </View>
                        <View style={styles.harga}>
                            <Text style={[styles.text, styles.hargaJual]}>Harga Jasa :</Text>
                            <Text style={[styles.text, styles.priceTag]}>Rp{formatPrice(data[0].harga)}</Text>
                        </View>
                        <Text style={[styles.text, { color: '#9F9F9F', fontSize: 10 }]}>Penyelesaian sekitar 3 hari</Text>
                        <Button style={styles.nextButton}>
                            <Text style={[styles.text, { fontSize: 10, color: '#fff', fontWeight: 'bold' }]}>Lanjutkan</Text>
                        </Button>
                        <View style={styles.ulasan}>
                            <Text style={[styles.text, styles.ulasanHeader]}>{data[0].jumlah_ulasan} Ulasan</Text>
                            <Link push
                                href={
                                    `/search/works/${slug}/reviews/`
                                }
                                asChild>
                                <Pressable>
                                    <Text style={[styles.text, styles.lihatSemua]}>Lihat semua</Text>
                                </Pressable>
                            </Link>

                        </View>
                    </View>

                </View>
            </ScrollView>)
            }
            {isTimeout && (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Button onPress={fetchData}>
                        <Text style={{ color: '#71BFD1', fontWeight: 'bold' }}>Refresh</Text>
                    </Button>
                </View>
            )}
        </SafeAreaView>

    )
}

export default JasaScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,

    },
    judul: {

    },
    information: {
        flex: 0,
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1,
        paddingVertical: 12
    },
    text: {
        fontFamily: "DM-Sans"
    },
    button: {

    },
    stackContainer: {
        width: '100%'
    },
    imageContainer: {
    },
    image: {
        width: '100%',
        height: '100%',
    },
    nama: {
        fontSize: 25,
        fontWeight: '700',
    },
    deskripsi: {
        fontSize: 10,
        color: '#9f9f9f'
    },
    rating: {
        fontSize: 15,
    },
    hargaJual: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    penjual: {
        width: '100%',
        height: 50,
        backgroundColor: '#71BFD1',
        marginVertical: 16,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    penjualProfile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flex: 0,
        marginHorizontal: 16,
    },
    chatFreelancerButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        flex: 0
    },
    harga: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 8,
    },
    priceTag: {
        fontSize: 20,
        color: '#71BFD1',
    },
    nextButton: {
        backgroundColor: '#10AB71',
        borderRadius: 10,
        flex: 0,
        marginHorizontal: 20,
        marginTop: 12,
    },
    scrollViewContent: {
        flexGrow: 1,
        width: '100%'
    },
    ulasan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        alignItems: 'center',
    },
    ulasanHeader: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    lihatSemua: {
        fontSize: 10,
        color: '#71BFD1',
        paddingTop: 8,
    }
})