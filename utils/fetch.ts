import { Alert } from "react-native";
import { supabase } from "./supabase";

export async function getMessagesFromChat(chatId) {
    try {
        const { data, error } = await supabase.from('message').select().eq('chat_id', chatId)

        if (error) {
            // console.error('Error fetching messages:', error)
            return { data: null, error: error }
        }

        return { data: data, error: null };
    } catch (error) {
        // console.error('Error fetching messages:', error)
        return { data: null, error: error };
    }

}

export async function getUserData(userId) {
    try {
        const { data, error } = await supabase.from("pengguna").select().eq('id', userId).single();
        if (error) {
            return { data: null, error: error };
        }

        return { data: data, error: null };

    } catch (error) {
        return { data: null, error: error };
    }
}

export async function createChatWithUser(userId1: string, userId2: string) {
    try {
        // create chat channel
        const { data: chatData, error } = await supabase.from('chat').insert({}).select().single();
        if (error) {
            return { data: null, error: error };
        }
        // create chatmember with the members
        const { data, error: chatMemberError } = await supabase.from('chatmember').insert({ chat_member_id: chatData?.id, members: [userId1, userId2] }).select().single();
        if (chatMemberError) {
            return { data: null, error: chatMemberError };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }

}

export async function checkChatExistence(userId1:string, userId2:string):Promise<{exist: boolean, chat_member_id: string}> {
    // check whether the user id 1 and user id 2 already have chat
    try {
        // Query the chatmember table to check for existing chats between userId1 and userId2
        const { data, error } = await supabase
            .from('chatmember')
            .select()
            .contains('members', [userId1, userId2]).single();

        if (error) {
            console.error('Error checking chat existence:', error);
            return {exist: false, chat_member_id: null};
        }

        // If the data array is not empty, a chat exists
        if (data.length === 0){
            return {exist: false, chat_member_id: null}
        };
        return {exist: true, chat_member_id: data.chat_member_id}
    } catch (error) {
        console.error('Error checking chat existence:', error);
        return {exist: false, chat_member_id: null};
    }
    
}