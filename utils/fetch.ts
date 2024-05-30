import { supabase } from "./supabase";

export async function getMessagesFromChat(chatId) {
    try {
        const { data, error } = await supabase.from('message').select().eq('chat_id', chatId)

        if (error) {
            // console.error('Error fetching messages:', error)
            return {data: null, error: error}
        }

        return {data: data, error:null};
    } catch(error) {
        // console.error('Error fetching messages:', error)
        return {data: null, error: error};
    }
    
}