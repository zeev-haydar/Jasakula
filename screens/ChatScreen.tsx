import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/components/search_bar';
import { TextInput, TouchableRipple } from 'react-native-paper';
import { useAuth } from '@/providers/AuthProvider';
import * as Clipboard from 'expo-clipboard';
import { getTimeOnClock } from '@/utils/formatting';
import { getMessagesFromChat } from '@/utils/fetch';
import { supabase } from '@/utils/supabase';
import { useChatContext } from '@/providers/chat_provider';


const ChatScreen = () => {
    const [text, setText] = useState('');
    const chat = useChatContext()

    const [groupedMessages, setGroupedMessages] = useState({});

    const auth = useAuth();
    const scrollViewRef = useRef(null);
    const { slug } = useLocalSearchParams();

    // const [messageData, setMessageData] = useState([
    //     { content: "Selamat Hari Raya Idul Fitri!! Mohon maaf lahir dan batin", sent_at: "2023-11-19T12:00:00Z", pengguna_id: auth.session.user.id },
    //     { content: "KONTROOLL!!!", sent_at: "2023-11-19T12:05:00Z", pengguna_id: auth.session.user.id },
    //     { content: "Merry Kurisumasu", sent_at: "2023-12-25T10:00:00Z", pengguna_id: "2" },
    //     { content: "Pinjem Duitmu seratus", sent_at: "2023-12-25T10:15:00Z", pengguna_id: "2" },
    //     { content: "Darupanmu wi lho, ncen wuelik tenan", sent_at: "2024-02-04T14:00:00Z", pengguna_id: "2" },
    //     { content: "AOWKOAWKOAWKOAKWOAWKOAWK", sent_at: "2024-03-11T09:00:00Z", pengguna_id: auth.session.user.id }
    // ]);
    const [messageData, setMessageData] = useState([]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        // fetch the messageData
        const fetchMessages = async () => {
            try {
                const { data: messages, error } = await supabase
                    .from('message')
                    .select('*')
                    .eq('chat_id', slug)
                    .order('sent_at', { ascending: true });

                if (error) {
                    console.error('Error fetching messages:', error);
                } else {
                    setMessageData(messages);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        supabase
            .channel('public:messages')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'message' }, async () => {
                await fetchMessages()
            })
            .subscribe();

    }, [slug]);

    
    useEffect(()=> {
        const grouped = messageData.reduce((groups, message) => {
            const date = new Date(message.sent_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
            return groups;
        }, {});
        setGroupedMessages(grouped);
    }, [messageData])

    const handleSubmit = async () => {
        if (text && text.length > 0) {
            const newMessage = {
                content: text,
                sent_at: new Date().toISOString(),
                pengguna_id: auth.session.user.id,
                chat_id: slug,
            }
            try {
                const { data, error } = await supabase
                    .from('message')
                    .insert([newMessage]);

                if (error) {
                    console.error('Error adding message:', error);
                    Alert.alert("Error", "Could not send message. Please try again.");
                } else {
                    setText('');
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }
            } catch (error) {
                console.error('Error adding message:', error);
            }
        }else{
            Alert.alert("Berikan pesan yang valid!")
        }
    }
    const copyToClipboard = (message) => {
        Clipboard.setStringAsync(message).then(() => {
            Alert.alert("Copied to clipboard", message);
        });
    };
    return (


        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: true, title: `${chat.otherPeoplesName}`,
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
    
                                    <TouchableRipple key={idx} onLongPress={() => copyToClipboard(message.content)} style={styles.messageContainer}>
                                        <View style={message.pengguna_id === auth.session.user.id ? styles.ownMessage : styles.othersMessage}>

                                            <Text style={{flex: 1, fontFamily: 'DMSans_400Regular', alignSelf: 'center',}}>{message.content}</Text>
                                            <View style={{marginRight: 8}}/>
                                            <Text style={{textAlignVertical: 'bottom', fontFamily: 'DMSans_400Regular', fontSize: 10, color: 'rgba(0, 0, 0, 0.49)'}}>{getTimeOnClock(message.sent_at)}</Text>


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
        flexDirection: 'row',
    },
    ownMessage: {
        backgroundColor: '#71bfd1',
        borderRadius: 12,
        padding: 12,
        elevation: 5,
        maxWidth: '60%',
        alignSelf: 'flex-end',
        flex: 0,
        flexDirection: 'row',
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