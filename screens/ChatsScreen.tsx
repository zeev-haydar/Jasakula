import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Vector1 from '../assets/styling/vector_1.svg';
import { SearchBar } from '@/components/search_bar';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/providers/AuthProvider';

const ChatsScreen = () => {

    const [text, setText] = React.useState("")
    const [nama, setNama] = React.useState("")
    const { slug } = useLocalSearchParams();
    const auth =  useAuth()

    if (auth.session.user?.id) {
        console.log(`Chat milik ${auth.session.user.user_metadata.username}`)
        console.log(`id pengguna: ${slug}`)
    }

    var itemData = [
        { id: 1, nama: "Haidar", lastMessage: "Pancene kowe pabu", lastMessageDate: "17/08/1945" },
        { id: 2, nama: "Haidar", lastMessage: "Nuruti Ibumu", lastMessageDate: "17/08/1945" },
        { id: 3, nama: "Haidar", lastMessage: "Jare nek rak ninja", lastMessageDate: "17/08/1945" },
        { id: 4, nama: "Haidar", lastMessage: "Ra oleh dicinta", lastMessageDate: "17/08/1945" },
        { id: 5, nama: "Haidar", lastMessage: "Apa kaya ngene", lastMessageDate: "17/08/1945" },
        { id: 6, nama: "Haidar", lastMessage: "Susahe wong kere", lastMessageDate: "17/08/1945" },
        { id: 7, nama: "Haidar", lastMessage: "Arep nyanding tresna", lastMessageDate: "17/08/1945" },
        { id: 8, nama: "Haidar", lastMessage: "Kalah karo bandha", lastMessageDate: "17/08/1945" },
        { id: 9, nama: "Haidar", lastMessage: "Kimcil Kepolen By NHPW A.K.A", lastMessageDate: "17/08/1945" },
    ]

    const router = useRouter();
    const handleSearch = () => {
        console.log("dienter");
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.chat}>
                <View style={{ marginRight: 12, backgroundColor: '#000', padding: 6, borderRadius: 128 }}>
                    <FontAwesomeIcon icon={faUser} size={20} color='#fff' />
                </View>
                <View style={styles.chatTexts}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.text, { fontWeight: 'bold' }]}>{item.nama}</Text>
                        <Text style={[styles.text, styles.normalText]}>{item.lastMessageDate}</Text>
                    </View>

                    <Text style={[styles.text, styles.normalText]}>{item.lastMessage}</Text>
                </View>
            </View>

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
                <SearchBar onChangeText={setText} text={text} onSubmitEditing={handleSearch} />
                <View style={styles.chatList}>
                    <FlatList
                        data={itemData}
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ flexGrow: 1 }}
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
        paddingHorizontal: 16,
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
    }
})