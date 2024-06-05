import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GenericStyles } from '@/styles/generic'
import StackHeader from '@/components/StackHeader'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useJasa } from '@/providers/JasaProvider'
import { formatPrice } from '@/utils/formatting'
import { Button, Modal, Portal, PaperProvider } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { QRISMock } from '@/mocks/payment_gatemay_mock'

const TransactionScreen = () => {
    const router = useRouter();
    const [metodePembayaran, setMetodePembayaran] = useState('');
    const [detailPesananan, setDetailPesanan] = useState('');

    const [modalMethodPembayaranVisible, setModalMethodPembayaranVisible] = useState(false);
    const showModalMethodPembayaran = () => setModalMethodPembayaranVisible(true);
    const hideModalMethodPembayaran = () => setModalMethodPembayaranVisible(false);

    const [modalQRISVisible, setModalQRISVisible] = useState(false);
    const showModalQRIS = () => setModalQRISVisible(true);
    const hideModalQRIS = () => setModalQRISVisible(false);

    const url = 'https://www.youtube.com/shorts/voyW4IdAIwE';
    // Encoded URL
    const encodedUrl = encodeURIComponent(url);


    const jasa = useJasa();
    const daftarMetodePembayaran = [
        "Qris",
        "BCA Virtual Account",
        "BRI",
        "Mandiri",
        "Dana",
        "GoPay",
        "ShopeePay",
        "Ovo",
    ]
    const { slug } = useLocalSearchParams();

    const handleBayar = () => {
        console.log("Auuuuuh");
        if (metodePembayaran !== "Qris") {
            Alert.alert("Maaf", "Metode pembayaran belum tersedia");
            return;
        }
        showModalQRIS();
    }

    const handleQRIS = () => {
        const success:boolean = new QRISMock().Pay("1212412512512", "1251112491801");
        if (success) {
            router.navigate("/home");
        }
    }
    return (
        <PaperProvider>
            <View style={GenericStyles.container}>
                <StackHeader title={"Rincian Pesanan"} />
                <Portal>
                    <Modal visible={modalMethodPembayaranVisible} onDismiss={hideModalMethodPembayaran} dismissableBackButton={true} contentContainerStyle={styles.modalContainerStyle} >
                        <Text style={[GenericStyles.mainFontBold, { fontSize: 20, marginBottom: 20 }]}>Pilih Metode Pembayaran</Text>
                        {daftarMetodePembayaran.map((item, index) => {
                            return (<>
                                <TouchableOpacity onPress={() => { setMetodePembayaran(item); hideModalMethodPembayaran(); }}>
                                    <Text key={index} style={GenericStyles.mainFont}>{item}</Text>
                                </TouchableOpacity>

                                {index < daftarMetodePembayaran.length - 1 && <View style={{ height: 15 }} />}
                            </>)
                        })}

                    </Modal>
                </Portal>
                <Portal>
                    <Modal style={{ justifyContent: 'flex-end', height: '100%' }} visible={modalQRISVisible} onDismiss={hideModalQRIS} dismissableBackButton={true} contentContainerStyle={styles.qrisModalStyle}>
                        <Text style={[GenericStyles.mainFont, { fontSize: 20, paddingBottom: 8 }]}>QR Code</Text>
                        <Text style={[GenericStyles.mainFont, { fontSize: 10, color: '#A3A3A3' }]}>Mohon selesaikan transaksi sebelum waktu yang ditentukan. Anda bisa melihat QR code kembali di menu order</Text>
                        <Image source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedUrl}` }} style={{ alignSelf: 'center', marginVertical: 20 }} height={150} width={150} />
                        <Button style={styles.nextButton} contentStyle={{ width: '100%' }} labelStyle={{ width: '100%' }} onPress={() =>  handleQRIS()}>
                            <Text style={[GenericStyles.mainFont, { fontSize: 10, color: '#fff', fontWeight: 'bold' }]}>OK</Text>
                        </Button>
                    </Modal>
                </Portal>
                <View style={GenericStyles.containerChildNoBG}>
                    <View style={styles.metodePembayaranContainer}>
                        <View style={styles.metodePembayaranSection1}>
                            <Text style={[GenericStyles.mainFontBold, { fontSize: 20 }]}>Metode Pembayaran</Text>
                            <TouchableOpacity style={{ width: '25%' }} onPress={showModalMethodPembayaran}>
                                <Text style={[GenericStyles.mainFont, { fontSize: 12, color: '#10AB71', flexWrap: 'wrap', }]}>{metodePembayaran.length === 0 ? "Tambah Baru" : "Ganti Metode Pembayaran"}</Text>
                            </TouchableOpacity>

                        </View>
                        {metodePembayaran.length > 0 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faCheckCircle} size={20} color='#52AE0F' />
                                <Text style={[GenericStyles.mainFont, { fontSize: 15, marginLeft: 8 }]}>{metodePembayaran}</Text>
                            </View>

                        ) : (
                            <Text style={[GenericStyles.mainFont, { fontSize: 10, color: '#9f9f9f' }]}>{"Silahkan memilih metode pembayaran untuk pesanan ini. bisa juga menambah metode pembayaran"}</Text>
                        )}

                    </View>
                    <View style={styles.metodePembayaranContainer}>
                        <Text style={[GenericStyles.mainFontBold, { fontSize: 20 }]}>Detail Pemesanan</Text>
                        <View style={[styles.detailPembayaranSection1, { marginTop: 8 }]}>
                            <Text style={[GenericStyles.mainFont, { maxWidth: '60%', fontSize: 10, textAlign: 'justify', overflow: 'hidden' }]}>
                                <Text style={{ fontStyle: 'italic' }}>"{jasa.jasa.deskripsi}" </Text>
                                Oleh <Text style={{ fontWeight: 'bold' }}>{jasa.jasa.penjual.pengguna.full_name}</Text>
                            </Text>
                            <Text style={[GenericStyles.mainFont, { fontSize: 12 }]}>
                                Rp{formatPrice(jasa.jasa.harga)}
                            </Text>
                        </View>
                        <View style={{ height: 15 }} />
                        <View style={[styles.detailPembayaranSection1, { marginTop: 8 }]}>
                            <Text style={[GenericStyles.mainFont, { maxWidth: '60%', fontSize: 10, textAlign: 'justify' }]}>
                                Biaya Aplikasi
                            </Text>
                            <Text style={[GenericStyles.mainFont, { fontSize: 12 }]}>
                                Rp{formatPrice(jasa.jasa.harga / 10)}
                            </Text>
                        </View>
                        <View style={{ height: 15 }} />
                        <View style={[styles.detailPembayaranSection1, { marginTop: 8, marginBottom: 20 }]}>
                            <Text style={[GenericStyles.mainFontBold, { maxWidth: '60%', fontSize: 15, textAlign: 'justify' }]}>
                                Total Harga
                            </Text>
                            <Text style={[GenericStyles.mainFontBold, { fontSize: 16 }]}>
                                Rp{formatPrice(jasa.jasa.harga * 1.1)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <View style={{ height: 15 }} />
                    <Button style={styles.nextButton} contentStyle={{ width: '100%' }} labelStyle={{ width: '100%' }} onPress={() => handleBayar()}>
                        <Text style={[GenericStyles.mainFont, { fontSize: 10, color: '#fff', fontWeight: 'bold' }]}>Bayar Sekarang</Text>
                    </Button>
                </View>

            </View>
        </PaperProvider>

    )
}

export default TransactionScreen

const styles = StyleSheet.create({
    metodePembayaranContainer: {
        width: '100%',
        paddingTop: 16,
    },
    metodePembayaranSection1: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 8,
    },
    metodePembayaranSection2: {

    },
    modalContainerStyle: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 20,
        borderRadius: 12,
    },
    metodePembayaranModal: {
        zIndex: 10,
        position: 'absolute',
        left: 0,
        top: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        width: '100%',
        height: '100%',
    },
    detailPembayaranSection1: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailPembayaranSection2: {

    },
    line: {
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        width: '100%',
    },
    nextButton: {
        backgroundColor: '#10AB71',
        borderRadius: 10,
        flex: 0,
        marginHorizontal: 20,
        marginTop: 12,
    },
    qrisModalStyle: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 20,
        borderRadius: 12,
    },
})