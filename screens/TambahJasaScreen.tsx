import { StyleSheet, Text, View, AppState, Image, TextInput, KeyboardAvoidingView, Platform, Alert, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '@/utils/supabase'
import { Link, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper'
import { useSession } from '@/providers/SessionProvider'
import { Session } from '@supabase/supabase-js'
import { useAuth } from '@/providers/AuthProvider'
import StackHeader from '@/components/StackHeader'
import { GenericStyles } from '@/styles/generic'
import { setUrlAsync } from 'expo-clipboard'
import { handleSaveImage, pickImage } from '@/utils/images'



const TambahJasaScreen = () => {
    const auth = useAuth();
    const [idPenjual, setIdPenjual] = useState('')
    const [nama, setNama] = useState('')
    const [url, setUrl] = useState('')
    const [url2, setUrl2] = useState('')
    const [kategori, setKategori] = useState('')
    const [image, setImage] = useState(null)
    const [harga, setHarga] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const scrollViewRef = React.useRef(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const router = useRouter();
    const handleSubmit = async () => {
        setLoadingSubmit(true);
        console.log(nama, kategori, url2, harga, deskripsi, idPenjual)
        if (!nama || !kategori || !image || !harga || !deskripsi) {
            Alert.alert("Semua kolom harus diisi!");
            setLoadingSubmit(false);
            return;
        }
        if (!nama || !kategori || !image || !harga || !deskripsi) {
            Alert.alert("Semua kolom harus diisi!");
            console.log("isi data")
            setLoadingSubmit(false);
            return;
        }

        try {

            const { data, error } = await supabase
                .from('jasa')
                .insert([{
                    nama,
                    jenis: kategori,
                    harga,
                    deskripsi,
                    penjual_id: idPenjual
                }]).select().single();

            if (error) {
                Alert.alert("Error inserting data:", error.message);
                setLoadingSubmit(false);
                console.log(error.message)
            } else {
                const error = await handleSaveImage(image, data.id, "images")
                if (error) {
                    Alert.alert("Error inserting data:", error);
                    console.log(error)
                    setLoadingSubmit(false);
                    return;
                }

                // add url_gambar with newly created image
                const imageFetched = await getImageFromSupabase(data.id)
                const {error: imageLoadError} = await supabase.from("jasa").update({
                    url_gambar: imageFetched
                }).eq("id", data.id)

                if (imageLoadError) {
                    // Alert.alert("Error inserting data:", imageLoadError.message);
                    console.log(imageLoadError)
                    throw imageLoadError
                }
                Alert.alert("Data berhasil disimpan!");
                setNama('');
                setKategori('');
                setImage(null);
                setHarga('');
                setDeskripsi('');
                router.replace('/profile')
            }
        } catch (error) {
            Alert.alert("Error handling data:", error?.message && 'pokoknya error');
        } finally {
            setLoadingSubmit(false);
        }
    };



    const fetchData = async () => {
        const { data, error } = await supabase
            .from('penjual')
            .select(' id , pengguna_id')
            .eq('pengguna_id', auth.session?.user?.id)
        if (error) {
            console.error('Error fetching items:', error);
        } else {
            console.log(auth.session?.user?.id)
            setIdPenjual(data[0].id);

        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                // console.log("Keyboard muncul")
                scrollViewRef.current?.setNativeProps({
                    // contentInset: { bottom: 250 },
                });
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // console.log("Keyboard hilang")
                scrollViewRef.current?.setNativeProps({
                    // contentInset: { bottom: 0 },
                });
            }
        );
        fetchData()
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        fetchData()
    }, []);

    const getImageFromSupabase = async (image) => {
    
        const { data: imageData} = supabase.storage.from('images').getPublicUrl(image);
    
        if (imageData.publicUrl.length === 0) {
            throw Error("Image not found");
        }
    
        return imageData.publicUrl;
    };

    return (


        <SafeAreaView style={{ flex: 1, paddingBottom: 24 }}>
            <StackHeader title={"Menu Tambahkan Jasa"} />
            <ScrollView
                contentContainerStyle={styles.contentStyle}
                keyboardShouldPersistTaps="handled"
                ref={scrollViewRef}

            >
                <KeyboardAvoidingView
                    style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
                    enabled
                >

                    <View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'DM-Sans', paddingTop: 6 }}>
                                Overview
                            </Text>

                        </View>
                        <View style={styles.line}>

                        </View>
                        <View style={{ paddingHorizontal: 15, marginVertical: 20 }}>
                            <Text style={{ marginVertical: 10 }}>
                                Nama Jasa
                            </Text>
                            <TextInput
                                placeholder="cth : Photografer pre-wedding pernikahan outdoor"
                                placeholderTextColor="#CFCECE"
                                value={nama}
                                onChangeText={setNama}
                                style={styles.input}
                            />
                            <View style={{width:'100%', alignItems: 'center'}}>
                                {image?.assets ?  (
                                    <Image source={{ uri: image.assets[0].uri }} style={[styles.input, { height: 250, width: 250, justifyContent: "center", alignItems: "center" }]} />
                                ) :(image ? (
                                    <Image source={{ uri: image.uri }} style={[styles.input, { height: 250,  width: 250, justifyContent: "center", alignItems: "center" }]} />
                                ) : (
                                    <View style={[styles.input, { height: 250, justifyContent: "center", alignItems: "center" }]}><Text style={{ color: "#CFCECE", textAlign: "center" }}>Tambahkan gambar yang relevan dengan konten yang ada pada jasa anda</Text></View>
                                ))}
                                <View style={{ marginTop: 20,  width: '80%' }}>
                                    <TouchableOpacity style={[GenericStyles.boxButtonBlue, { alignItems: 'center', justifyContent: 'center', }]} onPress={()=>pickImage(setImage)}>
                                        <Text style={{ color: "#fff", lineHeight: 40, textAlignVertical: 'center', width: '100%', textAlign: 'center'}}>Unggah Foto</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                            <Text style={{ marginVertical: 10 }}>
                                Kategori
                            </Text>
                            <TextInput
                                placeholder="Kategori"
                                placeholderTextColor="#CFCECE"
                                value={kategori}
                                onChangeText={setKategori}
                                style={styles.input}
                            />
                            <Text style={{ marginVertical: 10 }}>
                                Deskripsi Jasa
                            </Text>
                            <TextInput
                                placeholder="cth : Photografer pre-wedding pernikahan outdoor"
                                placeholderTextColor="#CFCECE"
                                value={deskripsi}
                                onChangeText={setDeskripsi}
                                style={[styles.input, { height: 200 }]}
                            />
                            <Text style={{ marginVertical: 10 }}>
                                Harga
                            </Text>
                            <TextInput
                                placeholder="Harga"
                                placeholderTextColor="#CFCECE"
                                value={harga}
                                onChangeText={setHarga}
                                style={styles.input}
                            />
                            <Button style={[GenericStyles.boxButtonBlue, { marginTop: 30, width: "100%" }]} onPress={handleSubmit} disabled={loadingSubmit}>
                                <Text style={{ color: "#fff" }}>Terbitkan Jasa</Text>
                            </Button>
                        </View>

                    </View>
                    <TouchableOpacity>

                    </TouchableOpacity>


                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>




    )
}

export default TambahJasaScreen

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 35,
        backgroundColor: '#FFFFFF',
        borderColor: "#C9C9C9",
        borderWidth: 1,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginVertical: 5,
    },
    contentStyle: {
        flexGrow: 1,
        width: '100%',
    },
    line: {
        width: '90%',
        height: 1.5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
        alignSelf: "center",
    },
})