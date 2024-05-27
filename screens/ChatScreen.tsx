import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/components/search_bar';
import { TextInput } from 'react-native-paper';


const ChatScreen = () => {
    const [text, setText] = useState('')
    const handleSubmit = () => {

    }
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    var messageData = [
        {
            tanggal: "19 November 2023",
            messages: [
                "Selamat Hari Raya Idul Fitri!! Mohon maaf lahir dan batin",
                "KONTROOLL!!!",
            ]
        },
        {
            tanggal: "25 Desember 2023",
            messages: [
                "Merry Kurisumasu",
                "Pinjem Duitmu seratus su",
            ]
        },
        {
            tanggal: "4 Februari 2024",
            messages: [
                "Oke gas! Oke gas. Sorry yeee!!!"
            ]
        },
        {
            tanggal: "11 Maret 2024",
            messages: [
                "AOWKOAWKOAWKOAKWOAWKOAWK"
            ]
        }
    ]
    const { slug } = useLocalSearchParams();
    return (


        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: true, title: `${slug}`,
                headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25 }
            }} />
            <KeyboardAvoidingView
                style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
                enabled
            >
                <ScrollView
                    ref={scrollViewRef}
                    keyboardShouldPersistTaps='handled'
                    style={styles.scrollView}
                    contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-end',  width: '100%', paddingHorizontal: 16}}>
                    {messageData.map((item, index) => {
                        return (
                            <View style={styles.messagesOnOneDate}>
                                <View style={styles.dateInfo}>
                                    <View style={styles.date}>
                                        <Text>{item.tanggal}</Text>

                                    </View>
                                </View>
                                {item.messages.map((message, index) => (
                                    <View style={styles.messageContainer}>
                                        <View style={styles.message}>
                                            <Text>{message}</Text>
                                        </View>
                                    </View>
                                ))}

                            </View>
                        )
                    })}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Silakan ketik pesan"
                        value={text}
                        onChangeText={setText}
                        onSubmitEditing={handleSubmit}
                        style={styles.input}
                        cursorColor='#71bfd1'
                        placeholderTextColor={'#9c9c9c'}
                        activeUnderlineColor='transparent'
                        
                    />
                </View>
            </KeyboardAvoidingView>



        </View>




    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 6,
        // paddingHorizontal: 16,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: '#71bfd1'
    },
    messagesOnOneDate: {
        flex: 0,
        width: '100%',
        marginBottom: 8

    },
    dateInfo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16
    },
    message: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        elevation: 5
    },
    date: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        elevation: 5
    },
    messageContainer: {
        width: '60%',
        marginBottom: 12
    },
    inputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    scrollView: {
        flex: 1,
        paddingVertical: 4,
    },
})