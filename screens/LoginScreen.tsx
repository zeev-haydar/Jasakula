import { StyleSheet, Text, View, AppState, Image, TextInput, KeyboardAvoidingView, Platform, Alert, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '@/utils/supabase'
import { Link, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { useSession } from '@/providers/SessionProvider'
import { Session } from '@supabase/supabase-js'
import { useAuth } from '@/providers/AuthProvider'
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
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const auth = useAuth();

  const scrollViewRef = React.useRef(null);
  async function signInWithEmail() {
    setLoading(true)
    console.log("mau login ah")

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    else {
      console.log("Login successful");
      auth.setSession(data.session); 
      router.replace('/home');

    }
    setLoading(false)
  }

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

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);



  return (

    <SafeAreaView style={{ flex: 1, paddingBottom: 24 }}>
      <ScrollView
        contentContainerStyle={styles.contentStyle}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}

      >
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
          enabled
        >
          <View>
            <Text style={{ fontSize: 25, fontFamily: "DM-Sans", fontWeight: 'bold', color: '#0A2135', marginTop: 40 }}>
              JasaKula
            </Text>
          </View>
          <Text style={{ fontSize: 10, fontFamily: "DM-Sans", fontWeight: 'normal', color: '#0A2135', marginTop: 13, textAlign: 'center', marginHorizontal: 50 }}>
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
          <TouchableOpacity>
            <Button style={styles.button} onPress={() => { signInWithEmail(); router.replace('/home');}} disabled={loading} >
              <Text style={{ textAlign: "center", color: "white", fontSize: 15, fontWeight: 'normal' }}>Login</Text>
            </Button>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', }}>
            <Text style={{ paddingRight: 4 }}>
              Tidak memiliki akun?

            </Text>
            <Link replace href="/register">
              <Text style={{ color: '#71BFD1' }} >
                Register
              </Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
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
    borderColor: "#0A2135",
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
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})