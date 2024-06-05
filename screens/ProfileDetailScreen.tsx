import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GenericStyles } from '@/styles/generic'
import VectorBG from '@/components/VectorBG'
import { Stack } from 'expo-router'
import ProfileImage from '@/components/ProfileImage'
import { useAuth } from '@/providers/AuthProvider'
import { handleSaveImage, loadImage, pickImage } from '@/utils/images'
import { Button, TextInput } from 'react-native-paper'
import TextInput1 from '@/components/TextInput1'
import { getUserData } from '@/utils/fetch'
import { printAllElements } from '@/utils/formatting'
import TextInput2 from '@/components/TextInput2'
import { supabase } from '@/utils/supabase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ProfileDetailScreen = () => {
  const auth = useAuth();
  useEffect(() => {
    if (auth.session?.user?.id)
      loadImage(setImage, auth?.session?.user?.id)
  }, [])


  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const fetchPengguna = async () => {
    const { data: fetchedData, error } = await getUserData(auth?.session?.user?.id);

    if (error) {
      Alert.alert("Error", error.message || error)
      return;
    }

    setData(fetchedData);
    setFullName(fetchedData.full_name || '');
    setNickname(fetchedData.nickname || '');
    setDeskripsi(fetchedData.deskripsi || '');
    printAllElements(data);
  }
  useEffect(() => {
    fetchPengguna();
  }, [])

  function giveEmptyAlert() {
    Alert.alert("Isi semua kolom yang diwajibkan");
  }

  function giveAlert(message) {
    Alert.alert(message)
  }

  function checkpointKe(num) {
    console.log("cp", num)
  }


  const handleSubmitSaveButton = async () => {
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
    if (!deskripsi || deskripsi?.length === 0) {
      giveEmptyAlert();
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

    const { error: updateUserError } = await supabase.from('pengguna').update({
      nickname: nickname,
      full_name: fullName,
      deskripsi: deskripsi,
    }).eq('id', auth.session.user.id);

    if (updateUserError) {
      Alert.alert(updateUserError.message);
      return;
    }

    const errorDb = await handleSaveImage(image, auth.session.user.id)
    if (errorDb) {
      giveAlert(errorDb);
      return;
    }

    console.log("Sukses, Data:\n", data)
    Alert.alert("Perubahan Berhasil Disimpan")
  }

  return (
    <View style={{ ...GenericStyles.containerBlue}}>
      <Stack.Screen options={{ headerShown: true, title: "Profile Info" , headerTitleStyle:GenericStyles.mainFontBold}} />


      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 12  }}
      >
        <View style={GenericStyles.backgroundVector}>
          <VectorBG />
        </View>
        <View style={{ alignItems: 'center', flex: 0 }}>
          <ProfileImage image={image} />
          <TouchableOpacity onPress={() => pickImage(setImage)}>
            <Text style={[GenericStyles.mainFont, { textDecorationLine: 'underline', marginTop: 16 }]}>
              Change Avatar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', marginTop: 16 }}>
          <TextInput1 value={fullName} setValue={setFullName} placeholder="Masukkan nama panjang" label={"Nama Panjang"} />
          <TextInput1 value={nickname} setValue={setNickname} placeholder={"Masukkan nama panggilan"} label={"Nama Panggilan"} />
          <TextInput2 value={deskripsi} setValue={setDeskripsi} placeholder={"Masukkan deskripsi"} label={"Deskripsi"} />
        </View>
        <Button style={[GenericStyles.boxButtonBlue, {width: '60%', alignSelf: 'center'}]} labelStyle={[{ color: "#fff", textAlign: 'center', width: '100%' }, GenericStyles.mainFontBold]} onPress={() => handleSubmitSaveButton()}>
          <Text>Simpan</Text>
        </Button>

      </KeyboardAwareScrollView>
    </View>
  )
}

export default ProfileDetailScreen

const styles = StyleSheet.create({
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
});
