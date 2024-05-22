import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/utils/supabase'
import { formatWithDate, printAllElements } from '@/utils/formatting'

const UlasanScreen = () => {

    const router = useRouter();
    const { slug } = useLocalSearchParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    // console.log(slug);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response;
                response = await supabase
                    .from('ulasan')
                    .select(`
                        *,
                        pengguna: pengguna_id(id, nickname)
                    `).eq('jasa_id', slug);
                if (response.error) {
                    throw response.error;
                }
                setData(response.data);
                // printAllElements(data);   // untuk debugging
            } catch (error) {
                console.log(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [slug])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 12, }}>
            <Stack.Screen options={{
                headerShown: true, title: "Ulasan",
                headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25 },
                headerLeft: () => (
                    <Button onPress={() => router.back()} style={styles.button_container}>
                        <FontAwesomeIcon icon={faArrowLeft} color='#fff' size={20} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    </Button>

                ),
            }} />

            {loading ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>Loading...</Text>
            ) : error ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>{error}</Text>
            ) : data.length === 0 ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>Result not found</Text>
            ) : (<ScrollView contentContainerStyle={{
                flexGrow: 1,
                width: '100%',
            }}>
                <View style={styles.container}>
                    {data.map((item, index) => {

                        return (
                            <View key={index} style={styles.review_box}>
                                <View style={styles.reviewer}>
                                    <View style={styles.profileIcon}>
                                        <FontAwesomeIcon icon={faUser} size={16} color='#FFFFFF' />
                                    </View>
                                    <Text style={[styles.text, { marginLeft: 8, fontWeight: 'bold' }]}>{item.pengguna.nickname}</Text>
                                </View>

                                <Text style={[styles.text, { marginBottom: 16 }]}>{item.content}</Text>
                                <View style={styles.ratingAndTime}>
                                    <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold' }]}>★ {item.rating}</Text>
                                    <Text style={[styles.text, { color: '#9f9f9f', fontSize: 10 }]}>{formatWithDate(item.sent_at)}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

            </ScrollView>
            )

            }
        </SafeAreaView>
    )
}

export default UlasanScreen

const styles = StyleSheet.create({
    button_container: {
        width: 24,
        height: 30,
        justifyContent: 'center', // Center the icon vertically
        alignItems: 'center', // Center the icon horizontally

    },
    container: {
        flex: 1,
        paddingHorizontal: 20,


    },
    review_box: {
        flex: 0,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        elevation: 6,
        borderRadius: 12,
        padding: 16,
        borderColor: '#00000009',
        borderWidth: 1,
        marginBottom: 8
    },
    reviewer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileIcon: {
        marginRight: 8,
        backgroundColor: '#000',
        padding: 4, borderRadius: 128,
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: "DM-Sans"
    },
    ratingAndTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
})