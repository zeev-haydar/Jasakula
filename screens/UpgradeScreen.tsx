import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { GenericStyles } from '@/styles/generic'
import { Stack, useRouter } from 'expo-router'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { faArrowLeft, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import StackHeader from '@/components/StackHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/utils/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { decode } from 'base64-arraybuffer'
import { FileObject } from '@supabase/storage-js'

const UpgradeScreen = () => {
    const router = useRouter();
    const auth = useAuth();

    const [page, setPage] = useState(1);
    const [image, setImage] = useState(null);
    const [nickname, setNickname] = useState('');
    const [fullName, setFullName] = useState('');
    const [description, setDescription] = useState('');

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
            const filePath = `public/avatars/${auth.session.user.id}.${extension}`;
    
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
        }
    };

    const PageInformation = () => {
        const items = [
            { key: 1, label: 'Info Pribadi' },
            { key: 2, label: 'Info Profesi' },
            { key: 3, label: 'Keamanan Akun' }
        ];
        return (
            <View style={styles.pageInformationContainer}>
                {items.map((item, index) => (
                    <React.Fragment key={item.key}>
                        <View style={styles.pageContainer}>
                            <View style={page === item.key ? styles.activeIndexBox : styles.inactiveIndexBox}>
                                <Text style={[GenericStyles.normalText, { color: "#fff" }]}>{item.key}</Text>
                            </View>
                            <Text style={[GenericStyles.normalText, page === item.key ? GenericStyles.activeColor : GenericStyles.inactiveColor]}>{item.label}</Text>
                        </View>
                        {index !== items.length - 1 && (
                            <FontAwesomeIcon icon={faChevronRight} size={20} color="#999" />
                        )}
                    </React.Fragment>
                ))}
            </View>
        );
    }

    const InformasiProfesi = () => {
        return (
            <View>
                <Text>Awuwu</Text>
            </View>
        )
    }

    const KeamananAkun = () => {
        return (
            <View></View>
        )
    }

    return (
        <View style={[GenericStyles.container]}>
            <StackHeader title={"Menjadi Penjual"} />
            <PageInformation />
            <KeyboardAwareScrollView
                contentContainerStyle={{ marginTop: 16 }}
                keyboardShouldPersistTaps="handled">
                {page === 1 && (<View style={{ flex: 1, paddingHorizontal: 12, paddingBottom: 24 }}>
                    <View style={{ borderBottomWidth: 1, paddingBottom: 8, marginBottom: 24 }}>
                        <Text style={[GenericStyles.heading1Text, GenericStyles.mainFont]}>Informasi Pribadi</Text>
                    </View>
                    <TextInput
                        label={
                            <Text style={[GenericStyles.normalText, { fontSize: 12 }, styles.label]}>
                                Nama Panggilan
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>}
                        style={styles.input}
                        // ref={nicknameRef}
                        placeholder="Masukkan nama panggilan"
                        placeholderTextColor={'#ccc'}
                        onChangeText={setNickname}
                        underlineColor='transparent'
                        activeUnderlineColor='#71bfd1'
                        onSubmitEditing={() => console.log("Nama panggilan:", nickname)}
                    />
                    <TextInput
                        label={
                            <Text style={[GenericStyles.mainFont, { fontSize: 12 }, styles.label]}>
                                Nama Panjang
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>}
                        style={styles.input}
                        // ref={fullNameRef}
                        placeholder="Masukkan nama panjang"
                        placeholderTextColor={'#ccc'}
                        onChangeText={setFullName}
                        onSubmitEditing={() => console.log("Nama Lengkap:", fullName)}
                        activeUnderlineColor='#71bfd1'
                        underlineColor='transparent'
                    />


                    <TextInput
                        label={
                            <Text style={[GenericStyles.normalText, { fontSize: 12 }, styles.label]}>
                                Deskripsi
                                <Text style={{ color: 'red' }}> *</Text>
                            </Text>}
                        style={[styles.input, { height: 125, overflow: 'scroll' }]}
                        // ref={descriptionRef}
                        onChangeText={setDescription}
                        onBlur={() => console.log("Deskripsi:\n", description)}
                        multiline
                        numberOfLines={4}
                        textAlignVertical='top'
                        underlineColor='transparent'
                        activeUnderlineColor='#71bfd1'
                    />
                    <View style={styles.setAvatar}>
                        <Text style={[GenericStyles.mainFont, { marginBottom: 10 }]}>Foto Profil <Text style={{ color: 'red' }}> *</Text></Text>
                        {image ? (
                            <Image source={{ uri: image }} style={{ width: 160, height: 160, borderRadius: 80 }} />
                        ) : (
                            <View style={{ backgroundColor: '#000', padding: 20, borderRadius: 640, width: 160, height: 160, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faUser} size={80} color='#71BFD1' />
                            </View>
                        )}
                        <Button style={[GenericStyles.boxButtonBlue, { marginTop: 20 }]} onPress={pickImage}>
                            <Text style={{ color: "#fff" }}>Unggah Foto</Text>
                        </Button>
                        <Button style={[GenericStyles.boxButtonBlue, {marginTop: 30, width: "100%"}]} onPress={handleSaveImage}>
                            <Text style={{ color: "#fff" }}>Selanjutnya</Text>
                        </Button>
                    </View>
                </View>
                )}
                {/* {page === 2 && <InformasiProfesi />}
                {page === 3 && <KeamananAkun />} */}
            </KeyboardAwareScrollView>

        </View>
    )
}

export default UpgradeScreen

const styles = StyleSheet.create({
    pageInformationContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#cfcece",
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 6,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    pageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextSection: {
        fontSize: 20,
        color: "#999"
    },
    activeIndexBox: {
        backgroundColor: GenericStyles.activeColor.color,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6
    },
    inactiveIndexBox: {
        backgroundColor: GenericStyles.inactiveColor.color,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6
    },
    activeIndex: {
        color: '#fff'
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 16,
        elevation: 2,
        textAlignVertical: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    label: {
        // marginBottom: 6,
        // alignSelf: 'flex-start'
    },
    setAvatar: {
        flex: 1,
        alignItems: 'center'
    }
})

