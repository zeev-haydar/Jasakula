import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/components/search_bar';
import { TextInput, TouchableRipple } from 'react-native-paper';
import { useAuth } from '@/providers/AuthProvider';
import * as Clipboard from 'expo-clipboard';


const ChatScreen = () => {
    const [text, setText] = useState('');
    const [messageData, setMessageData] = useState([
        { message: "Selamat Hari Raya Idul Fitri!! Mohon maaf lahir dan batin", sent_at: "2023-11-19T12:00:00Z", pengguna_id: "43bb235b-7569-46e6-b2e1-6baed15666ec" },
        { message: "KONTROOLL!!!", sent_at: "2023-11-19T12:05:00Z", pengguna_id: "43bb235b-7569-46e6-b2e1-6baed15666ec" },
        { message: "Merry Kurisumasu", sent_at: "2023-12-25T10:00:00Z", pengguna_id: "2" },
        { message: "Pinjem Duitmu seratus su", sent_at: "2023-12-25T10:15:00Z", pengguna_id: "2" },
        { message: "Oke gas! Oke gas. Sorry yeee!!!", sent_at: "2024-02-04T14:00:00Z", pengguna_id: "2" },
        { message: "AOWKOAWKOAWKOAKWOAWKOAWK", sent_at: "2024-03-11T09:00:00Z", pengguna_id: "43bb235b-7569-46e6-b2e1-6baed15666ec" }
    ]);
    const [groupedMessages, setGroupedMessages] = useState({});

    const auth = useAuth();
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        const grouped = messageData.reduce((groups, message) => {
            const date = new Date(message.sent_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
            return groups;
        }, {});
        setGroupedMessages(grouped);
    }, [messageData]);

    const handleSubmit = () => {
        if (text && text.length > 0) {
            const newMessage = {
                message: text,
                sent_at: new Date().toISOString(),
                pengguna_id: auth.session.user.id,
            }
            setMessageData(prevMessages => [...prevMessages, newMessage]);
            setText('');
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }else{
            Alert.alert("Berikan pesan yang valid!")
        }
    }

    const copyToClipboard = (message) => {
        Clipboard.setStringAsync(message).then(() => {
            Alert.alert("Copied to clipboard", message);
        });
    };


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
                    contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-end', width: '100%', paddingHorizontal: 16 }}>
                    {Object.keys(groupedMessages).map((date, index) => (
                        <View key={index} style={styles.messagesOnOneDate}>
                            <View style={styles.dateInfo}>
                                <View style={styles.date}>
                                    <Text>{date}</Text>
                                </View>
                            </View>
                            {groupedMessages[date].map((message, idx) => (
    
                                    <TouchableRipple key={idx} onLongPress={() => copyToClipboard(message.message)} style={styles.messageContainer}>
                                        <View style={message.pengguna_id === auth.session.user.id ? styles.ownMessage : styles.othersMessage}>

                                            <Text>{message.message}</Text>


                                        </View>
                                    </TouchableRipple>
                            ))}
                        </View>
                    ))}
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
        flex: 1,
        width: '100%',
        marginBottom: 8

    },
    dateInfo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16
    },
    othersMessage: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        elevation: 5,
        maxWidth: '60%',
        alignSelf: 'flex-start',
        flex: 0,
    },
    ownMessage: {
        backgroundColor: '#71bfd1',
        borderRadius: 12,
        padding: 12,
        elevation: 5,
        maxWidth: '60%',
        alignSelf: 'flex-end',
        flex: 0,
    },
    date: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        elevation: 5
    },
    messageContainer: {
        marginBottom: 12,
        width: '100%',
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