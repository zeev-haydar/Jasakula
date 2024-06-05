import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, Stack, useRouter } from 'expo-router'
import { supabase } from '@/utils/supabase'
import { AuthProvider, useAuth } from '@/providers/AuthProvider'
import { ChatProvider } from '@/providers/chat_provider'

const _layout = () => {
    const router = useRouter();
    const auth = useAuth();
    useEffect(() => {
        if (!auth.session) { router.replace('/login') } else { console.log("ada auth") }
    }, [])

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#71BFD1',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontFamily: 'DM-Sans',
                    fontSize: 25
                },
            }}
        />

    )
}

export default _layout