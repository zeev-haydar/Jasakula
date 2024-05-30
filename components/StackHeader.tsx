import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { GenericStyles } from '@/styles/generic';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconButton } from 'react-native-paper';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans';

const StackHeader = ({ title }) => {
    const router = useRouter();
    return (
        <Stack.Screen options={{
            headerShown: true, title: title,
            headerTitleStyle: { fontFamily: 'DMSans_700Bold', fontSize: 20 },
            headerLeft: () => (
                <View style={GenericStyles.buttonContainer}>
                    <IconButton
                        onPress={() => router.back()}
                        icon={() => (
                            <FontAwesomeIcon icon={faArrowLeft}
                                color='#fff' size={20} style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10
                                }}
                            />
                        )}/>
                </View>


            ),
        }} />
    )
}

export default StackHeader