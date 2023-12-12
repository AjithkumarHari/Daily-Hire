import { ChatRoomDbRepositoryMongoDB } from "../../framework/database/repository/chatRoomDbRepository";

export const chatRoomDbRepository = (repository: ReturnType<ChatRoomDbRepositoryMongoDB>) => {

    const addChatRoom = async (senderId: string, receiverId: string) => await repository.addChatRoom(senderId, receiverId);
    
    const getChatRoom = async (senderId: string, receiverId: string) => await repository.getChatRoom(senderId, receiverId);
    
    const getChatMate = async (id: string) => await repository.getChatMate(id);
  

    return {
        addChatRoom,
        getChatRoom,
        getChatMate,
    }
}

export type ChatRoomRepository = typeof chatRoomDbRepository;