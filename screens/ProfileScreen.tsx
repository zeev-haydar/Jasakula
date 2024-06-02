import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Link, Stack, useRouter } from 'expo-router'
import { ActivityIndicator, Button } from 'react-native-paper'
import { supabase } from '@/utils/supabase'
import { SafeAreaView } from 'react-native-safe-area-context'
import Vector1 from '../assets/styling/vector_1.svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faGear, faHammer, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/providers/AuthProvider'
import { loadImage } from '@/utils/images'
import { GenericStyles } from '@/styles/generic'

const ProfileScreen = () => {
  const router = useRouter();
  const auth = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [image, setImage] = useState(null)
  const handleLogout = async () => {
    console.log('dipencet')
    const { error } = auth.signOut()
    if (error) {
      console.log("Gagal logout", error)
      return
    }
    console.log("berhasil logout")
    router.replace("/home")
  }

  useEffect(() => {
    const fetchPengguna = async () => {
      if (!auth.session?.user) {
        setLoading(false);
        router.replace("/home");
        return;
      }
      const { data, error } = await supabase.from('pengguna').select('*').eq('id', auth.session?.user?.id).single()
      if (error) {
        console.error(error)
        return;
      }

      setData(data);
      setIsSeller(data?.role === 'penjual');
      console.log(data)
      setLoading(false);
    }

    fetchPengguna();
  }, [])

  useEffect(() => {
    if (auth.session?.user?.id)
      loadImage(setImage, auth?.session?.user?.id)
  }, [])

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Stack.Screen options={{ headerShown: false, title: "Profile" }} />
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerChild}>
        <View style={styles.background_vector}>
          <Vector1 />
        </View>
        <Stack.Screen options={{ headerShown: false, title: "Profile" }} />
        <View style={styles.topProfileHeader}>
          <View style={styles.topProfile}>
            <View style={{ marginRight: 12, backgroundColor: '#000', width: 35, height: 35, padding: 6, alignItems: 'center', overflow: 'hidden', justifyContent: 'center', borderRadius: 128 }}>
              {
                image?.uri ? (
                  <Image source={{ uri: image.uri }} style={{ width: 35, height: 35, }} />
                ) : (
                  <FontAwesomeIcon icon={faUser} size={20} color='#71BFD1' />
                )
              }
            </View>
            <Text style={[GenericStyles.boldFont, styles.normalTextSize]}>{auth.session?.user?.user_metadata?.username || ''}</Text>
          </View>
          {!isSeller && (
            <Link asChild href={"/profile/upgrade"}>
              <Button style={{ flex: 0, backgroundColor: '#000', borderRadius: 10 }}>
                <Text style={[styles.text, styles.bold, { color: '#fff' }, styles.normalTextSize]}> Upgrade to Seller</Text>
              </Button>
            </Link>
          )}

        </View>

        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, fontFamily: 'DMSans_700Bold', paddingBottom: 24, borderBottomWidth: 0.3, borderBottomColor: "#CFCECE" }}>Jasakula</Text>
          <View style={styles.menuText}>
            <View style={[{ flexDirection: 'row', paddingVertical: 16, },]}>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} color='#CCC' />
              <Text style={[{ fontSize: 15, }, styles.text]}>Profile</Text>
            </View>
            <Text style={[styles.text, styles.lebihDariSymbol]}>{">"}</Text>

          </View>
          <View style={styles.menuText}>
            <View style={[{ flexDirection: 'row', paddingVertical: 16, },]}>
              <FontAwesomeIcon icon={faGear} style={{ marginRight: 8 }} color='#CCC' />
              <Text style={[{ fontSize: 15, }, styles.text]}>Setting</Text>
            </View>
            <Text style={[styles.text, styles.lebihDariSymbol]}>{">"}</Text>

          </View>
          <Link asChild href={"/profile/jasa"}>
            <TouchableOpacity style={{ flex: 0 }}>
              <View style={styles.menuText}>

                <View style={[{ flexDirection: 'row', paddingVertical: 16, },]}>
                  <FontAwesomeIcon icon={faHammer} style={{ marginRight: 8 }} color='#CCC' />
                  <Text style={[{ fontSize: 15, }, styles.text]}>Jasaku</Text>
                </View>
                <Text style={[styles.text, styles.lebihDariSymbol]}>{">"}</Text>


              </View>
            </TouchableOpacity>
          </Link>
          <Pressable onPress={handleLogout}>
            <View style={styles.menuText}>
              <View style={[{ flexDirection: 'row', paddingVertical: 16, },]}>
                <FontAwesomeIcon icon={faSignOut} style={{ marginRight: 8 }} color='#CCC' />
                <Text style={[{ fontSize: 15, }, styles.text]}>Log keluar</Text>
              </View>
              <Text style={[styles.text, styles.lebihDariSymbol]}>{">"}</Text>
            </View>
          </Pressable>


        </View>


      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71bfd1'
  },
  containerChild: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    width: '100%',
  },
  background_vector: {
    zIndex: -1,
    position: 'absolute',
    flex: 1,
    justifyContent: 'flex-start',
    left: 0,
    top: 0,
    // // maxHeight: 200,
    // height: 250,
    height: '100%',
    width: '100%',
    aspectRatio: undefined
  },
  topProfile: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center'
  },
  topProfileHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 140,
  },
  text: {
    fontFamily: 'DM-Sans',
  },
  bold: {
    fontWeight: 'bold'
  },
  normalTextSize: {
    fontSize: 15,
  },
  textContainer: {
    flex: 1,
    width: '100%',
  },
  menuText: {
    width: '100%',

    borderBottomWidth: 0.3,
    borderBottomColor: "#CFCECE",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebihDariSymbol: {
    fontSize: 30,
    color: '#CCC',
  }
})