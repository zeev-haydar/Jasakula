import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { GenericStyles } from '@/styles/generic'
import StackHeader from '@/components/StackHeader'
import { useLocalSearchParams } from 'expo-router'
import { useOrder } from '@/providers/order_provider'
import { addDaysToDate, formatPrice, formatWithDate, truncateText } from '@/utils/formatting'

const OrderDetailScreen = () => {
    const { slug } = useLocalSearchParams();
    const orderContext = useOrder();
    return (
        <View style={GenericStyles.container}>
            <StackHeader title={"Detail Pesanan"} />
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: orderContext.order?.jasa?.url_gambar?.length > 0 ? orderContext.order?.jasa?.url_gambar : 'https://www.youngontop.com/wp-content/uploads/2023/10/elephant-amboseli-national-park-kenya-africa.jpg' }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={{ fontSize: 10, fontFamily: 'DMSans_700Bold' }}>{truncateText(orderContext.order.jasa.nama, 10)}</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'DMSans_400Regular', marginTop: 7 }}>{truncateText(orderContext.order.jasa.deskripsi, 10)}</Text>
                        <View style={styles.alignBottomContainer}>
                            <Text style={[styles.alignBottomText, { color: '#71BFD1' }]}>Rp{formatPrice(orderContext.order.cost)}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ height: 20 }} />
                <View style={styles.card2}>
                    <Text style={[GenericStyles.mainFontBold, { fontSize: 20 }]}>Ingfo Pemesanan</Text>
                    <View style={{ height: 10 }} />
                    <View style={styles.infoContainer}>
                        <Text style={[GenericStyles.mainFont, styles.label]}>Tanggal</Text>
                        <Text style={[GenericStyles.mainFont, styles.value]}>: {formatWithDate(orderContext.order.tanggal)}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[GenericStyles.mainFont, styles.label]}>Status</Text>
                        <Text style={[GenericStyles.mainFont, styles.value]}>: {orderContext.order.status}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[GenericStyles.mainFont, styles.label]}>Tanggal Perkiraan Selesai</Text>
                        <Text style={[GenericStyles.mainFont, styles.value]}>: {formatWithDate(addDaysToDate(orderContext.order.tanggal, 7))}</Text>
                    </View>

                </View>
            </View>

        </View>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#71bfd1",
        width: '100%',
        flex: 1,
    },
    buttonContainer: {
        width: '50%',
        height: 40,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "DMSans_700Bold",
        color: '#9F9F9F',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    header: {
        backgroundColor: '#71BFD1',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontFamily: "DMSans_700Bold",
        color: 'white',
        fontSize: 20,
    },
    lineContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    line: {
        width: '50%',
        height: 1.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        height: '35%',
        width: '40%',
        borderRadius: 5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        height: 130,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 3,

    },
    card2: {
        flexDirection: 'column',
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 3,
        padding: 10,
    },
    imageContainer: {
        width: '33.33%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    contentContainer: {
        width: '66.67%',
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
        paddingVertical: 10,
    },
    alignBottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    alignBottomText: {
        fontSize: 15,
        fontFamily: 'DMSans_400Regular',
        alignSelf: 'flex-end', // Align text to the right
    },
    orderList: {
        flex: 1,
        paddingHorizontal: 10
    },
    label: {
        flex: 1,
        width: '100%',
        color: '#9F9F9F',
    },
    value: {
        flex: 1,
        color: '#000',
    },
    infoContainer: {
        flexDirection:'row', 
        justifyContent: 'space-between',
        marginBottom: 5,
    }
});