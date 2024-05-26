import { StyleSheet, Text, View, AppState, Image, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Link, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  async function signInWithEmail() {
    setLoading(true)
    console.log("mau login ah")

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    else {
      console.log("asd")

    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentStyle}>
        <View>
          <Text style={{ fontSize: 25, fontFamily: "DM-Sans", fontWeight: 'bold', color: '0A2135', marginTop: 85 }}>
            JasaKula
          </Text>
        </View>
        <Text style={{ fontSize: 10, fontFamily: "DM-Sans", fontWeight: 'normal', color: '0A2135', marginTop: 13, textAlign: 'center', marginHorizontal: 50 }}>
          JasaKula menjadi platform tempat bertemunya para freelancer dan pemiliki projek. Freelancer akan membuat penawaran kerja untuk anda
        </Text>
        <View>
          <Image style={styles.image}
            source={require('@/assets/adaptive-icon.png')}
          />
        </View>
        <View>
          <Text style={{ fontSize: 25, marginBottom: 15, fontWeight: "bold" }}>
            Login
          </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#0A2135"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#0A2135"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input]}
          />
        </View>
        <Button style={styles.button} onPress={() => { signInWithEmail(); router.replace('/home') }} >
          <Text style={{ textAlign: "center", color: "white", fontSize: 15, fontWeight: 'normal' }}>Login</Text>
        </Button>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{paddingRight: 4}}>
            Tidak memiliki akun?

          </Text><Link href="/register">
            <Text style={{ color: '#71BFD1' }} >
              Register
            </Text>
          </Link>
        </View>

      </ScrollView>
    </SafeAreaView>

  )
}

export default LoginScreen


const styles = StyleSheet.create({
  image: {
    width: 241, // Lebar gambar
    height: 241, // Tinggi gambar
    resizeMode: 'contain', // Mengatur mode resize gambar
    marginTop: 25,
  },
  input: {
    width: 300,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderColor: "0A2135",
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  contentStyle: {
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: 300,
    height: 35,
    backgroundColor: "#0A2135",
    marginVertical: 10,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 20,
  }
})