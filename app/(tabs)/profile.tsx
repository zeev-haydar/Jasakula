import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { supabase } from '@/utils/supabase'

const Page = () => {
  const router = useRouter();
  const handleLogout = async () => {
    console.log('dipencet')
    const {error} =  await supabase.auth.signOut()
    if (error) {
        console.log("Gagal logout", error)
        return
    }
    console.log("berhasil logout")
    router.replace("/login")
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Profile" }} />
      <Button onPress={handleLogout}>
        <Text>Pencet untuk logout</Text>
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Page