import { ScrollView, StyleSheet, Text, View, Image, Alert, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GenericStyles } from '@/styles/generic'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { Button, IconButton, TextInput, TouchableRipple } from 'react-native-paper'
import { faArrowLeft, faChevronRight, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import StackHeader from '@/components/StackHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/utils/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { decode } from 'base64-arraybuffer'
import { FileObject } from '@supabase/storage-js'
import { loadImage, handleSaveImage, pickImage } from '@/utils/images'
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from 'react-native-dropdown-picker';

const UpgradeScreen = () => {
    const router = useRouter();
    const auth = useAuth();

    const [page, setPage] = useState(1);
    const [image, setImage] = useState(null);
    const [nickname, setNickname] = useState('');
    const [fullName, setFullName] = useState('');
    const [description, setDescription] = useState('');
    const [pekerjaan, setPekerjaan] = useState(null);
    const [selectedLevelPengalaman, setLevelPengalaman] = useState('');
    const [showEdukasiDropDown, setShowEdukasiDropDown] = useState([]);
    const [keahlian, setKeahlian] = useState('')
    const [edukasiList, setEdukasiList] = useState(['']);
    const [sertifikatList, setSertifikatList] = useState<Array<string>>([''])

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    "Konfirmasi",
                    "Apakah Anda yakin ingin kembali? Semua data yang terisi akan hilang.",
                    [
                        {
                            text: "Tidak",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "Ya",
                            onPress: () => {
                                if (router.canGoBack()) {
                                    router.back()
                                    return true;
                                }
                                return false;
                            }
                        }
                    ],
                    { cancelable: false }
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [router])
    );

    useEffect(() => {
        loadImage(setImage, auth.session.user.id);
    }, []);

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

    const handleAddEdukasi = () => {
        setEdukasiList([...edukasiList, '']);
        setShowEdukasiDropDown([...showEdukasiDropDown, false]);
    };

    const handleDeleteEdukasi = (index) => {
        const newEdukasiList = edukasiList.filter((_, i) => i !== index);
        const newShowEdukasiDropDown = showEdukasiDropDown.filter((_, i) => i !== index);

        setEdukasiList(newEdukasiList);
        setShowEdukasiDropDown(newShowEdukasiDropDown);
    }

    const handleEdukasiChange = (text, index) => {
        const newEdukasiList = edukasiList.map((item, i) =>
            i === index ? text : item
        );
        setEdukasiList(newEdukasiList);
    };

    const handleSertifikatChange = (index, value) => {
        const newSertifikatList = [...sertifikatList];
        newSertifikatList[index] = value;
        setSertifikatList(newSertifikatList);
    };

    // Function to add a new sertifikat entry
    const handleSertifikatAdd = () => {
        setSertifikatList([...sertifikatList, '']);
    };

    // Function to delete a sertifikat entry
    const handleSertifikatDelete = (index) => {
        const newSertifikatList = sertifikatList.filter((_, i) => i !== index);
        setSertifikatList(newSertifikatList);
    };

    function giveEmptyAlert() {
        Alert.alert("Isi semua kolom yang diwajibkan");
    }

    function giveAlert(message) {
        Alert.alert(message)
    }

    function checkpointKe(num) {
        console.log("cp", num)
    }
    const handleSubmitLanjutkanButton = async () => {
        if (!nickname || nickname?.length === 0) {
            giveEmptyAlert();
            return;
        }
        checkpointKe(1)
        if (!fullName || fullName?.length === 0) {
            giveEmptyAlert();
            return;
        }
        checkpointKe(2)
        if (!description || description?.length === 0) {
            giveEmptyAlert();
            return;
        }
        checkpointKe(3)
        if (!keahlian || keahlian?.length === 0) {
            giveEmptyAlert();
            return;
        }
        checkpointKe(4)
        if (!pekerjaan || pekerjaan?.length === 0) {
            giveEmptyAlert();
            return;
        }
        checkpointKe(5)
        console.log("panjang list edukasi:", edukasiList.length)
        console.log(edukasiList)
        if (!edukasiList || edukasiList.length === 0) {
            giveEmptyAlert();
            return;
        }
        edukasiList.forEach((edukasi) => {
            if (edukasi?.length <= 1) {
                giveEmptyAlert();
                return;
            }
        });
        console.log("panjang list sertifikat:", sertifikatList.length)
        if (!sertifikatList || sertifikatList.length === 0) {
            giveEmptyAlert();
            return;
        }
        sertifikatList.forEach((sertifikat) => {
            if (sertifikat?.length === 0) {
                giveEmptyAlert();
                return;
            }
        })

        const errorDb = await handleSaveImage(image, auth.session.user.id)
        if (errorDb) {
            giveAlert(errorDb);
            return;
        }

        // return;
        // perbarui database
        const { data: userData, error: userError } = await supabase
            .from('pengguna')
            .select('role')
            .eq('id', auth.session.user.id)
            .single();

        if (userError) {
            Alert.alert(userError.message);
            return;
        }

        if (userData.role !== 'penjual') {
            const { error: updateUserError } = await supabase.from('pengguna').update({
                nickname: nickname,
                full_name: fullName,
                deskripsi: description,
                role: 'penjual',
            }).eq('id', auth.session.user.id);

            if (updateUserError) {
                Alert.alert(updateUserError.message);
                return;
            }
        } else {
            Alert.alert("akun ini sudah merupakan penjual");
            router.canGoBack() && router.back()
            return;
        }

        const { data, error } = await supabase.from('penjual').upsert({
            pengguna_id: auth.session.user.id,
            keahlian: keahlian,
            pekerjaan: pekerjaan,
            edukasi: edukasiList,
            sertifikat: sertifikatList,
        }).select()

        if (error) {
            Alert.alert(error.message)
            return;
        }

        console.log("Sukses, Data:\n", data)
        Alert.alert("Upgrade Sukses")
        router.canGoBack() && router.back()


    }

    const InformasiPribadi = () => (
        <View style={[styles.pageContent, page !== 1 && { display: 'none' }]}>
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
                {image?.assets ? (
                    <Image source={{ uri: image.assets[0].uri }} style={{ width: 160, height: 160, borderRadius: 80 }} />
                ) : (
                    image ? (
                        <Image source={{ uri: image.uri }} style={{ width: 160, height: 160, borderRadius: 80 }} />
                    ) : (
                        <View style={{ backgroundColor: '#000', padding: 20, borderRadius: 640, width: 160, height: 160, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faUser} size={80} color='#71BFD1' />
                        </View>
                    )
                )}
                <Button style={[GenericStyles.boxButtonBlue, { marginTop: 20 }]} onPress={() => pickImage(setImage)}>
                    <Text style={{ color: "#fff" }}>Unggah Foto</Text>
                </Button>
                <Button style={[GenericStyles.boxButtonBlue, { marginTop: 30, marginHorizontal: 30 }]} labelStyle={{ color: "#fff", width: '100%' }} onPress={() => setPage(page + 1)}>
                    <Text>Selanjutnya</Text>
                </Button>
            </View>
        </View>
    );

    const InformasiProfesi = () => {
        return (
            <View style={[{ flex: 1, paddingHorizontal: 12, paddingBottom: 24 }, page !== 2 && { display: 'none' }]}>
                <View style={{ borderBottomWidth: 1, paddingBottom: 8, marginBottom: 24 }}>
                    <Text style={[GenericStyles.heading1Text, GenericStyles.mainFont]}>Informasi Profesi</Text>
                </View>
                <TextInput
                    label={
                        <Text style={[GenericStyles.normalText, { fontSize: 12 }, styles.label]}>
                            Pekerjaan
                            <Text style={{ color: 'red' }}> *</Text>
                        </Text>}
                    style={styles.input}
                    placeholder="Masukkan pekerjaan"
                    placeholderTextColor={'#ccc'}
                    onChangeText={setPekerjaan}
                    underlineColor='transparent'
                    activeUnderlineColor='#71bfd1'
                    onSubmitEditing={() => console.log("Pekerjaan:", pekerjaan)}
                />
                <TextInput
                    label={
                        <Text style={[GenericStyles.normalText, { fontSize: 12 }, styles.label]}>
                            Keahlian
                            <Text style={{ color: 'red' }}> *</Text>
                        </Text>}
                    style={styles.input}
                    placeholder="Masukkan keahlian"
                    placeholderTextColor={'#ccc'}
                    onChangeText={setKeahlian}
                    underlineColor='transparent'
                    activeUnderlineColor='#71bfd1'
                    onSubmitEditing={() => console.log("Pekerjaan:", keahlian)}
                />
                <Text style={{ fontSize: 18, fontFamily: 'DMSans_700Bold', marginBottom: 10, paddingLeft: 6 }}>Edukasi</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '80%' }}>

                        {edukasiList.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60, marginBottom: 16 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                                    <TextInput
                                        label={<Text style={[GenericStyles.mainFont, { fontSize: 12 }, styles.label]}>Edukasi<Text style={{ color: 'red' }}> *</Text></Text>}
                                        style={{ ...styles.inputWithoutMargin, flex: 1, marginRight: 10, }}
                                        placeholderTextColor={'#ccc'}
                                        onChangeText={(text) => handleEdukasiChange(text, index)}
                                        value={item}
                                        activeUnderlineColor='#71bfd1'
                                        underlineColor='transparent'
                                    />
                                    <Button style={[GenericStyles.boxButtonRed, { height: 40 }]} labelStyle={{ color: "#fff" }} onPress={() => handleDeleteEdukasi(index)}>
                                        <Text>&ndash;</Text>
                                    </Button>
                                </View>
                            </View>
                        ))}

                    </View>

                    <Button style={[GenericStyles.boxButtonGreen, { height: 40, }]} contentStyle={{ height: 40, width: 40 }} labelStyle={{ color: "#fff" }} onPress={handleAddEdukasi}>
                        <Text>+</Text>
                    </Button>
                </View>

                <Text style={{ fontSize: 18, fontFamily: 'DMSans_700Bold', marginBottom: 10, paddingLeft: 6 }}>Sertifikat</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '80%' }}>

                        {sertifikatList.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60, marginBottom: 16 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                                    <TextInput
                                        label={<Text style={[GenericStyles.mainFont, { fontSize: 12 }, styles.label]}>Judul<Text style={{ color: 'red' }}> *</Text></Text>}
                                        style={{ ...styles.inputWithoutMargin, flex: 1, marginRight: 10, }}
                                        placeholderTextColor={'#ccc'}

                                        onChangeText={(text) => handleSertifikatChange(index, text)}
                                        value={item}
                                        activeUnderlineColor='#71bfd1'
                                        underlineColor='transparent'
                                    />
                                    {/* <TextInput
                                        label={<Text style={[GenericStyles.mainFont, { fontSize: 12 }, styles.label]}>Pemberi Sertifikat<Text style={{ color: 'red' }}> *</Text></Text>}
                                        style={{ ...styles.inputWithoutMargin, flex: 1, marginRight: 10, }}
                                        placeholderTextColor={'#ccc'}
                                        onChangeText={(text) => handleSertifikatChange(index, 'asal_sertif', text)}
                                        value={item.asal_sertif}
                                        activeUnderlineColor='#71bfd1'
                                        underlineColor='transparent'
                                    /> */}
                                    <Button style={[GenericStyles.boxButtonRed, { height: 40 }]} labelStyle={{ color: "#fff" }} onPress={() => handleSertifikatDelete(index)}>
                                        <Text>&ndash;</Text>
                                    </Button>
                                </View>
                            </View>
                        ))}

                    </View>

                    <Button style={[GenericStyles.boxButtonGreen, { height: 40 }]} labelStyle={{ color: "#fff" }} onPress={() => handleSertifikatAdd()}>
                        <Text>+</Text>
                    </Button>
                </View>
                <View style={{ marginTop: 30, marginHorizontal: 10, flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                    <Button style={[GenericStyles.boxButtonOrange, { marginRight: 15 }]} labelStyle={{ color: "#fff" }} onPress={() => setPage(page - 1)}>
                        <Text>Sebelumnya</Text>
                    </Button>
                    <Button style={[GenericStyles.boxButtonBlue]} labelStyle={{ color: "#fff" }} onPress={() => setPage(page + 1)}>
                        <Text>Selanjutnya</Text>
                    </Button>
                </View>

            </View>
        )
    }

    const KeamananAkun = () => {
        return (
            <View style={[{ flex: 1, paddingHorizontal: 12, paddingBottom: 24, justifyContent: 'space-between', flexDirection: 'column' }, page !== 3 && { display: 'none' }]}>
                <View style={{ flex: 0 }}>
                    <View style={{ borderBottomWidth: 1, paddingBottom: 8, marginBottom: 24 }}>
                        <Text style={[GenericStyles.heading1Text, GenericStyles.mainFont]}>Keamanan Akun</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={{ flexDirection: 'row', paddingBottom: 8 }}>
                                <FontAwesomeIcon icon={faPhone} size={20} color='#ccc' style={{ marginRight: 10 }} />
                                <Text style={{ fontFamily: 'DM-Sans' }}>Nomor Telepon</Text>
                            </View>
                            <Text style={{ color: '#9f9f9f', fontFamily: 'DM-Sans' }}>Kami tidak menyebarkan nomor telepon anda</Text>
                        </View>
                        <TouchableRipple rippleColor={'#ccc'}>
                            <Button style={{ backgroundColor: '#fff', borderRadius: 2, borderWidth: 0.5, borderColor: '#CFCECE' }}
                                contentStyle={{ justifyContent: 'center' }}
                                labelStyle={{ color: '#636363', fontFamily: 'DMSans_400Regular', alignSelf: 'center' }}
                                onPress={() => console.log('maaf kepencet heeh')}
                            >
                                Tambah Nomor
                            </Button>
                        </TouchableRipple>

                    </View>
                </View>


                <View style={{ marginTop: 30, marginHorizontal: 10, flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                    <Button style={[GenericStyles.boxButtonOrange, { marginRight: 25 }]} labelStyle={{ color: "#fff" }} onPress={() => setPage(page - 1)}>
                        <Text>Sebelumnya</Text>
                    </Button>
                    <Button style={[GenericStyles.boxButtonBlue]} labelStyle={{ color: "#fff" }} onPress={() => handleSubmitLanjutkanButton()}>
                        <Text>Lanjutkan dan Buat Jasamu</Text>
                    </Button>
                </View>

            </View>
        )
    }

    return (
        <View style={[GenericStyles.container]}>
            <StackHeader title={"Menjadi Penjual"} />
            <PageInformation />
            <KeyboardAwareScrollView
                contentContainerStyle={{ marginTop: 16 }}
                keyboardShouldPersistTaps="handled">
                {InformasiPribadi()}
                {InformasiProfesi()}
                {KeamananAkun()}
            </KeyboardAwareScrollView >
        </View >
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
    inputWithoutMargin: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        elevation: 2,
        textAlignVertical: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    dropdownInput: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
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
    },
    pageContent: {
        flex: 1, paddingHorizontal: 12, paddingBottom: 24
    }
})

