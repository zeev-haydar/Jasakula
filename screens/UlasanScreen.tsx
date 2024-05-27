import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faPlus, faUser, faStar } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/utils/supabase'
import { formatWithDate, printAllElements } from '@/utils/formatting'
import StackView from '@/components/StackView'
import { IconButtonProps } from 'react-native-paper'

const UlasanScreen = () => {
    const [session, setSession] = useState(null);
    const router = useRouter();
    const { slug,user_id } = useLocalSearchParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [currNumberOfStars, setNumberOfStars] = useState(0);

    const [inputVisible, setInputVisible] = useState(false);
    const [newReview, setNewReview] = useState('');

    const handleAddReview = async () => {
        try {
            const { error } = await supabase.from('ulasan').insert({
                content: newReview,
                rating: currNumberOfStars,
                jasa_id: slug,
                pengguna_id: session?.user?.id
            });
            if (error) throw error;
            setInputVisible(false);
            setNewReview('');
            setNumberOfStars(0);
            const { data, error: fetchError } = await supabase
                .from('ulasan')
                .select(`
                    *,
                    pengguna: pengguna_id(id, nickname)
                `)
                .eq('jasa_id', slug);
            if (fetchError) throw fetchError;
            setData(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await supabase.auth.getSession();
            setSession(sessionData.data.session);
        };

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

        fetchSession();
        fetchData();

    }, [slug]);

    const handleStarPress = (star) => {
        setNumberOfStars(star);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 8 }}>
            <Stack.Screen options={{
                headerShown: true, title: "Ulasan",
                headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25 },
                headerLeft: () => (
                    <IconButton
                        icon={() => (
                            <FontAwesomeIcon icon={faArrowLeft} color='#fff' size={20} style={{ justifyContent: 'center', alignItems: 'center', margin: 16 }} />
                        )}
                        onPress={() => router.back()}
                        style={styles.button_container} />

                ),
            }} />

            {loading ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>Loading...</Text>
            ) : error ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>{error}</Text>
            ) : data.length === 0 ? (
                <Text style={[styles.text, { fontSize: 15, textAlign: 'center', justifyContent: 'center', color: "#9f9f9f" }]}>Result not found</Text>
            ) : (
                <ScrollView contentContainerStyle={{
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
            )}
            <IconButton
                icon={() => <FontAwesomeIcon icon={faPlus} color='#fff' size={24} />}
                size={66}
                style={styles.addButton}
                onPress={() => setInputVisible(true)}
            />
            {inputVisible && (
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.overlayBackground} onPress={() => setInputVisible(false)} />
                    <KeyboardAvoidingView style={{ flex: 1,flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', zIndex: 10, position: 'absolute', bottom: 8, width: '100%' }}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
                        enabled>
                        <View style={styles.inputBox}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={[styles.text, {fontSize: 16, textAlignVertical: 'bottom'}]}>Rating : </Text>
                                <View style={styles.ratingStars}>
                                     {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                                            <FontAwesomeIcon 
                                                icon={faStar} 
                                                size={24}
                                                color={currNumberOfStars >= star ? '#71BFD1' : '#C4C4C4'} 
                                                style={styles.star} 
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Tulis review Anda..."
                                value={newReview}
                                onChangeText={setNewReview}
                                underlineColor='transparent'
                                activeUnderlineColor='transparent'
                                cursorColor='#71bfd1'
                                placeholderTextColor={'#C4C4C4'}

                            />
                            <Button style={[styles.submitButton]} mode="contained" onPress={handleAddReview}>
                                Submit
                            </Button>
                        </View>
                    </KeyboardAvoidingView>

                </View>
            )}
        </SafeAreaView>
    )
}

export default UlasanScreen

const styles = StyleSheet.create({
    button_container: {
        width: 24,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '100%',

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
        marginBottom: 8,
        width: '100%',
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
    addButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#71BFD1',
        borderRadius: 75,
        width: 48,
        height: 48,
        zIndex: 12,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    overlayBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
    },
    keyboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        zIndex: 20
    },
    input: {
        width: '100%',
        height: 30,
        backgroundColor: '#FFF',
        borderRadius: 16,
        fontFamily: "DM-Sans",
        fontSize: 12,
        marginTop: 10,
        marginBottom: 20,
        borderColor: '#9f9f9f',
        borderWidth: 0.5,
    },
    submitButton: {
        backgroundColor: '#71bfd1'
    },
    ratingStars: {
        flexDirection: 'row'
    },
    star: {
        margin: 2,
    }
})