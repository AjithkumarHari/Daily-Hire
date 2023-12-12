import { Chat } from "../../../types/Chat";
import CHAT from "../models/chatModel";


export const chatDbRepositoryMongoDB = () => {
 
    const addChat = async (chat: Chat) => {
        return await CHAT.create(chat);
    }

    const getChats = async (chatRoomId: string) => {
        return await CHAT.find( { chatRoomId: chatRoomId})
    }

    return {
        getChats,
        addChat,
        
    }
}

export type ChatDbRepositoryMongoDB = typeof chatDbRepositoryMongoDB;