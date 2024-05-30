import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Vector1 from '../assets/styling/vector_1.svg';
import { SearchBar } from '@/components/search_bar';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import { printAllElements } from '@/utils/formatting';
import { GenericStyles } from '@/styles/generic';
import { getUserAvatarURI, loadImage } from '@/utils/images';
import { useChatContext } from '@/providers/chat_provider';

const ChatsScreen = () => {

    const chat = useChatContext();
    const [text, setText] = React.useState("")
    const [nama, setNama] = React.useState("")
    // const [itemData, setItemData] = React.useState([

    //         { id: 1, nama: "Haidar", lastMessage: "Pancene kowe pabu", lastMessageDate: "17/08/1945" },
    //         { id: 2, nama: "Haidar", lastMessage: "Nuruti Ibumu", lastMessageDate: "17/08/1945" },
    //         { id: 3, nama: "Haidar", lastMessage: "Jare nek rak ninja", lastMessageDate: "17/08/1945" },
    //         { id: 4, nama: "Haidar", lastMessage: "Ra oleh dicinta", lastMessageDate: "17/08/1945" },
    //         { id: 5, nama: "Haidar", lastMessage: "Apa kaya ngene", lastMessageDate: "17/08/1945" },
    //         { id: 6, nama: "Haidar", lastMessage: "Susahe wong kere", lastMessageDate: "17/08/1945" },
    //         { id: 7, nama: "Haidar", lastMessage: "Arep nyanding tresna", lastMessageDate: "17/08/1945" },
    //         { id: 8, nama: "Haidar", lastMessage: "Kalah karo bandha", lastMessageDate: "17/08/1945" },

    // ])
    const [itemData, setItemData] = React.useState([])
    const { user_id } = useLocalSearchParams();
    const auth = useAuth()

    if (auth.session.user?.id) {
        console.log(`Chat milik ${auth.session.user.user_metadata.username}`)
        // console.log(`id pengguna: ${user_id}`)
    }


    const router = useRouter();
    const handleSearch = () => {
        console.log("dienter");
    };

    const fetchChats = async () => {
        try {
            const { data, error } = await supabase
                .from('chatmember')
                .select(`
                    chat_member_id,
                    members,
                    message:last_message_id (
                        id,
                        content, 
                        sent_at
                    )
                `)
                .contains('members', [`${auth.session.user.id}`]) // Filter chatmembers where the current user is a member

            if (error) {
                console.error('Error fetching chats:', error)
                return
            }

            const chatDataWithFullNames = await Promise.all(data.map(async (chat) => {
                // Extract the other member's ID
                const otherPersonId = chat.members.find(member => member !== auth.session.user.id)

                // Fetch the full_name of the other member
                const { data: otherPersonData, error: otherPersonError } = await supabase
                    .from('pengguna')
                    .select('full_name')
                    .eq('id', otherPersonId)
                    .single()

                if (otherPersonError) {
                    console.error('Error fetching other person data:', otherPersonError)
                    return { ...chat, otherPersonName: 'Unknown' }
                }

                // add image
                const imageURI = await getUserAvatarURI(otherPersonId)

                return { ...chat, otherPersonName: otherPersonData.full_name, imageUrl: imageURI }
            }))



            // printAllElements(chatDataWithFullNames)
            setItemData(chatDataWithFullNames)

        } catch (error) {
            console.error('Error fetching chats:', error)
        }
    }

    useEffect(() => {
        
        fetchChats()

        // Realtime subscription to update the chat list when new messages arrive
        supabase
        .channel('public:messages')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'message' }, async () => {
            await fetchChats()
        })
        .subscribe() 

    }, [])


    const renderItem = ({ item }) => {
        const lastMessage = item.message ? {
            content: item.message.content,
            date: new Date(item.message.sent_at).toLocaleDateString()
        } : null


        return (
            <Link asChild href={`/chats/${item.chat_member_id}`}>
                <Pressable onPress={()=>chat.changeName(item.otherPersonName)}>
                    <View style={styles.chat}>
                        {item?.imageUrl ?
                            (<Image source={{ uri: item.imageUrl }} width={32} height={32} style={{borderRadius: 128, overflow: 'hidden', marginRight: 12}}/>)
                             : 
                             (
                                <View style={{ marginRight: 12, backgroundColor: '#000', padding: 6, borderRadius: 128 }}>
                                    <FontAwesomeIcon icon={faUser} size={20} color='#fff' />
                                </View>
                            )
                        }
                        <View style={styles.chatTexts}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[GenericStyles.boldFont, { width: "60%" }]}>{item.otherPersonName}</Text>
                                <Text style={[styles.text, styles.normalText]}>{lastMessage?.date || 'None'}</Text>
                            </View>

                            <Text style={[styles.text, styles.normalText]}>{lastMessage?.content || 'empty'}</Text>
                        </View>
                    </View>
                </Pressable>
            </Link>


        );
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>

            <View style={styles.container}>
                <Stack.Screen options={{
                    headerShown: true, headerTransparent: true, title: "Obrolan",
                    headerTitleStyle: { fontFamily: 'DM-Sans', fontWeight: 'bold', fontSize: 25 }
                }} />
                < View style={styles.backgroundVector}>
                    <Vector1 />
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <SearchBar onChangeText={setText} text={text} onSubmitEditing={handleSearch} placeholder='Cari Obrolan' />
                </View>

                <View style={styles.chatList}>
                    <FlatList
                        data={itemData}
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.chat_member_id.toString()}
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, }}
                    />
                </View>
            </View>
        </SafeAreaView >

    )
}

export default ChatsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 70,

    },
    safeAreaView: {
        flex: 1,
        backgroundColor: '#71bfd1'
    },
    backgroundVector: {
        zIndex: -1,
        position: 'absolute',
        flex: 1,
        justifyContent: 'flex-start',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        aspectRatio: undefined
    },
    chatList: {
        flex: 1,
        width: '100%',
        marginTop: 60,

    },
    chatTexts: {

        flex: 1,
        paddingVertical: 8,


    },
    text: {
        fontFamily: 'DM-Sans'
    },
    normalText: {
        color: '#A0A0A0'
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#CFCECE',
        borderBottomWidth: 0.5,
        width: '100%',
    }
})