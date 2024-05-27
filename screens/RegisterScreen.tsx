import { StyleSheet, Text, View, AppState, Image, TextInput, TouchableOpacity, Alert, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router'
import { AuthProvider, useAuth } from '@/components/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp, signIn, signOut } = useAuth();
  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: nama,
        }
      }
    })

    if (error) {
      Alert.alert(error.message);
    } else {
      if (!session) {
        Alert.alert('Please check your inbox for email verification!');
      } else {
        await upsertUserData(session.user.id, nama, password);
      }
    }
    setLoading(false)
  }

  async function upsertUserData(userId, username, password) {
    const { error } = await supabase.from('pengguna').upsert({
      id: userId,
      username: username,
      password: password,
    });

    if (error) {
      Alert.alert('Error updating user data', error.message);
    } else {
      Alert.alert('User data updated successfully');
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingBottom: 16 }}>
      <ScrollView contentContainerStyle={styles.scrollContentStyle} keyboardShouldPersistTaps='handled'>
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
            <Text style={{ fontSize: 25, marginBottom: 25, fontWeight: "bold" }}>
              Register
            </Text>
            <TextInput
              placeholder="Nama"
              placeholderTextColor="#0A2135"
              value={nama}
              onChangeText={setNama}
              style={[styles.input]}
            />
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
          <TouchableOpacity style={styles.button} onPress={() => signUpWithEmail()}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 15, fontWeight: 'normal' }}  disabled={loading}>Register</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ paddingRight: 4 }}>
              Sudah memiliki akun?

            </Text>
            <Link replace href="/login">
              <Text style={{ color: '#71BFD1',}} >
                Login
              </Text>
            </Link>
          </View>
        </KeyboardAvoidingView>

      </ScrollView>


    </SafeAreaView>
  )
}

const App = () => (
  <AuthProvider>
    <RegisterScreen />
  </AuthProvider>
);

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
  button: {
    width: 300,
    height: 35,
    backgroundColor: "#0A2135",
    marginVertical: 10,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 20,
  },
  scrollContentStyle: {
    flex: 1,
    alignItems: 'center',
  }
})

export default App;