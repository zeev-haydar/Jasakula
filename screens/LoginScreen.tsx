import { StyleSheet, Text, View, AppState } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/utils/supabase'

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

    async function signInWithUser() {
        
    }
    
    return (
        <View>
            <Text>LoginScreen</Text>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})