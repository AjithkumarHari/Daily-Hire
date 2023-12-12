import { ChatDbRepositoryMongoDB } from "../../framework/database/repository/chatDbRepository";
import { Chat } from "../../types/Chat";

export const chatDbRepository = (repository: ReturnType<ChatDbRepositoryMongoDB>) => {

    const addChat = async (chat: Chat) => await repository.addChat(chat);
    
    const getChats = async (chatRoomId: string) => await repository.getChats(chatRoomId);

    return {
        addChat,
        getChats,
    }
}

export type ChatRepository = typeof chatDbRepository;