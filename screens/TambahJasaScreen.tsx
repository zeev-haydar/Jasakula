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

    const router = useRouter();
    const handleSubmit = async () => {
        handleSaveImage()
        console.log(nama,kategori,url2,harga,deskripsi,idPenjual)
        if (!nama || !kategori || !image || !harga || !deskripsi) {
            Alert.alert("Semua kolom harus diisi!");
            return;
        }
        if (!nama || !kategori || !image || !harga || !deskripsi) {
            Alert.alert("Semua kolom harus diisi!");
            console.log("isi data")
            return;
        }

        try {

            const { data, error } = await supabase
                .from('jasa')
                .insert([{ 
                    nama, 
                    jenis: kategori, 
                    url_gambar: url2, 
                    harga, 
                    deskripsi, 
                    penjual_id: idPenjual
                }]);

            if (error) {
                Alert.alert("Error inserting data:", error.message);
                console.log(error.message)
            } else {
                Alert.alert("Data berhasil disimpan!");
                setNama('');
                setKategori('');
                setImage(null);
                setHarga('');
                setDeskripsi('');
                router.replace('/profile')
            }
        } catch (error) {
            Alert.alert("Error handling data:", error.message);
        }
    };
    const handleSaveImage = async () => {
        if (!image || !image.assets || image.assets.length === 0) {
            // Pastikan ada gambar yang dipilih sebelum melanjutkan
            Alert.alert("Mana gambarnya?")
            return;
        }

        try {
            const uri = image.assets[0].uri;

            // Membaca file gambar dari URI
            const response = await fetch(uri);
            const imageBlob = await response.blob();

            // Menentukan path penyimpanan dengan benar
            const mimeType = image.assets[0].mimeType as string;
            const extension = mimeType.split('/')[1];       // get the extension "png" or "jpeg"
            const filePath = `public/avatars/${url}.${extension}`;
            

            // Mendapatkan metadata gambar

            const metadata = {
                contentType: mimeType,
                upsert: true
            };

            const arrayBuffer = await new Response(imageBlob).arrayBuffer()

            // Melakukan unggah gambar ke penyimpanan Supabase
            const { data, error } = await supabase.storage
                .from("avatars")
                .upload(filePath, arrayBuffer, metadata);

            if (error) {
                // Mengatasi kesalahan jika terjadi
                Alert.alert("Error uploading image:", error.message);
            } else {
                // Menampilkan pesan sukses jika berhasil diunggah
                Alert.alert("Image uploaded successfully:", data.path);
            }
        } catch (error) {
            // Menangani kesalahan yang mungkin terjadi selama proses
            Alert.alert("Error handling image:", error.message);
        }
    }



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
                console.log("Keyboard muncul")
                scrollViewRef.current?.setNativeProps({
                    // contentInset: { bottom: 250 },
                });
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log("Keyboard hilang")
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

      }, [idPenjual]);

      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUrl(result?.assets[0]?.fileName)

        }
    };


    return (


        <SafeAreaView style={{ flex: 1, paddingBottom: 24 }}>
            <ScrollView
                contentContainerStyle={styles.contentStyle}
                keyboardShouldPersistTaps="handled"
                ref={scrollViewRef}

            >
                <KeyboardAvoidingView
                    style={{ flex: 1, flexDirection: 'column' }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
                    enabled
                >
                    <StackHeader title={"Menu Tambahkan Jasa"} />
                    <View>
                        <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 20 }}>
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
                            <View >
                                {image ? (
                                    <Image source={{ uri: image }} style={[styles.input, { height: 250, justifyContent: "center", alignItems: "center" }]} />
                                ) : (
                                    <View style={[styles.input, { height: 250, justifyContent: "center", alignItems: "center" }]}><Text style={{color: "#CFCECE", textAlign: "center"}}>Tambahkan gambar yang relevan dengan konten yang ada pada jasa anda</Text></View>
                                )}
                                <Button style={[GenericStyles.boxButtonBlue, { marginTop: 20 }]} onPress={pickImage}>
                                    <Text style={{ color: "#fff" }}>Unggah Foto</Text>
                                </Button>
                            </View>
                            <Text style={{ marginVertical: 10 }}>
                                Katagori
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
                            <Button style={[GenericStyles.boxButtonBlue, { marginTop: 30, width: "100%" }]} onPress={handleSubmit}>
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
        flex: 1,
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