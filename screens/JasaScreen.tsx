import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPrice } from '@/utils/formatting';
import { useJasa } from '@/providers/JasaProvider';
import StackView from '@/components/StackView';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from 'react-native-paper';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const JasaScreen = () => {
    const { slug } = useLocalSearchParams();

    const navigation = useNavigation();
    const router = useRouter();

    const { jasa: jasaContext } = useJasa();
    const { changeJasa } = useJasa();

    const nama = jasaContext ? jasaContext.nama : '';
    const rating = jasaContext ? jasaContext.rating : '';
    const deskripsi = jasaContext ? jasaContext.deskripsi : '';
    const imagePath = jasaContext.imagePath ? jasaContext.imagePath : require('@/assets/images/placeholder-design.png'); // use template image
    const penjual = jasaContext ? jasaContext.penjual.pengguna.fullName : '';
    const harga = jasaContext ? jasaContext.harga : '';
    const screenWidth = Dimensions.get('window').width;
    // Set image container height proportional to screen width (e.g., 16:9 ratio)
    const imageHeight = (9 / 16) * screenWidth;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{
                headerShown: false
            }} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>

                    <View style={[styles.stackContainer, { height: imageHeight }]}>
                        <StackView>
                            <View style={[styles.imageContainer, { height: imageHeight, width: screenWidth }]}>
                                <Image source={imagePath} style={styles.image} resizeMode='cover' />
                            </View>
                            <Button onPress={() => { router.back(); changeJasa(null); }} style={styles.button}>
                                <FontAwesomeIcon icon={faArrowLeft} color='#fff' size={20} style={{ justifyContent: 'center', alignItems: 'center' }} />
                            </Button>
                        </StackView>
                    </View>

                    {/* <Text>Info jasa {slug}</Text> */}
                    <View style={styles.content}>
                        <View style={styles.information}>
                            {React.Children.map([
                                <Text style={[styles.text, styles.nama]} key="nama">{nama}</Text>,
                                <Text style={[styles.text, styles.rating]} key="rating">★ {rating}</Text>,
                                <Text style={[styles.text, styles.deskripsi]} key="deskripsi">{deskripsi}</Text>,
                            ], child => (
                                React.cloneElement(child, { style: [child.props.style, { paddingBottom: 8 }] })
                            ))}
                        </View>
                        <View style={styles.penjual}>
                            <View style={styles.penjualProfile}>
                                <View style={{ marginRight: 8, backgroundColor: '#000', padding: 4, borderRadius: 128 }}>
                                    <FontAwesomeIcon icon={faUser} size={16} color='#71BFD1' />
                                </View>

                                <Text style={[styles.text, styles.rating]}>{penjual}</Text>
                            </View>
                            <Button style={styles.chatFreelancerButton}>
                                <Text style={[styles.text, { fontSize: 10, color: '#71BFD1', fontWeight: 'bold' }]}>Chat Freelancer</Text>
                            </Button>
                        </View>
                        <View style={styles.harga}>
                            <Text style={[styles.text, styles.hargaJual]}>Harga Jasa :</Text>
                            <Text style={[styles.text, styles.priceTag]}>Rp{formatPrice(harga)}</Text>
                        </View>
                        <Text style={[styles.text, { color: '#9F9F9F', fontSize: 10 }]}>Penyelesaian sekitar 3 hari</Text>
                        <Button style={styles.nextButton}>
                            <Text style={[styles.text, { fontSize: 10, color: '#fff', fontWeight: 'bold' }]}>Lanjutkan</Text>
                        </Button>
                        <View style={styles.ulasan}>
                            <Text style={[styles.text, styles.ulasanHeader]}>20 Ulasan</Text>
                            <Pressable>
                                <Text style={[styles.text, styles.lihatSemua]}>Lihat semua</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </ScrollView>

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
    }
})