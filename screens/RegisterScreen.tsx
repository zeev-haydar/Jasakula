import { StyleSheet, Text, View, AppState, Image, TextInput ,TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router'
import { AuthProvider, useAuth } from '@/components/AuthContext';
const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama] = useState('')
  const [loading, setLoading] = useState(false)
  const {signUp, signIn, signOut } = useAuth();
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
          username : nama,
        }
      }
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }
  return (
    <View style={{alignItems: 'center'}}>
    <View>
        <Text style={{ fontSize: 25, fontFamily: "DM-Sans", fontWeight: 'bold', color: '0A2135', marginTop:113}}>
        JasaKula
        </Text>
    </View>
        <Text style={{ fontSize: 10, fontFamily: "DM-Sans", fontWeight: 'normal', color: '0A2135', marginTop:13, textAlign: 'center' , marginHorizontal : 50}}>
        JasaKula menjadi platform tempat bertemunya para freelancer dan pemiliki projek. Freelancer akan membuat penawaran kerja untuk anda
        </Text>
    <View>
    <Image style={styles.image}
    source={require('@/assets/adaptive-icon.png')} 
    />
    </View>
    <View>
        <Text style={{fontSize : 25, marginBottom: 25, fontWeight: "bold"}}>
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
     <Text style={{textAlign:"center", color: "white", fontSize: 15, fontWeight: 'normal'}}>Register</Text>
     </TouchableOpacity>
     <View style={{flexDirection: 'row',}}>
    <Text>
        Sudah memiliki akun?

    </Text><Link href="/login">
    <Text style={{color:'#71BFD1'}} >
         Login
    </Text>
    </Link>
    </View>
    
</View>
  )
}

const App = () => (
  <AuthProvider>
    <RegisterScreen/>
  </AuthProvider>
);

const styles = StyleSheet.create({
  image: {
      width: 241, // Lebar gambar
      height: 241, // Tinggi gambar
      resizeMode: 'contain', // Mengatur mode resize gambar
      marginTop: 25,
    },
    input:{
      width: 300,
      height: 35,
      backgroundColor : '#FFFFFF',
      borderColor : "0A2135",
      borderWidth: 1,
      paddingHorizontal: 5,
      borderRadius: 5,
      marginVertical: 5,   
    },
    button:{
      width: 300,
      height: 35,
      backgroundColor: "#0A2135",
      marginVertical: 10,
      justifyContent: 'center', alignItems: 'center',
      borderRadius: 20, 
    }
})

export default App;