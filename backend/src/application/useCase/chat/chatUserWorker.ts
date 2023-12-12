import { Chat } from "../../../types/Chat";
import { ChatRepository } from "../../repository/chatDbRepository";
import { ChatRoomRepository } from "../../repository/chatRoomDbRepository";

export const sendChat = async (
    chatData:{
        content: string,
        senderId: string,
        receiverId: string,
    } ,
    chatRepository: ReturnType<ChatRepository>,
    chatRoomRepository: ReturnType<ChatRoomRepository>,
) => {
    try{
        const isChatRoomExists = await chatRoomRepository.getChatRoom(chatData.senderId, chatData.receiverId);
        if(isChatRoomExists){
            const chat: Chat = {
                ...chatData,
                date: new Date(),
                chatRoomId: isChatRoomExists._id
            };
            await chatRepository.addChat(chat);
            return {"status":"success"}
        }else{
            const newChatRoom = await chatRoomRepository.addChatRoom(chatData.senderId, chatData.receiverId);
            const chatRoomId = newChatRoom._id;
            const chat: Chat = {
                ...chatData,
                date: new Date(),
                chatRoomId: chatRoomId,
            }
            await chatRepository.addChat(chat);
            return {"status":"success"}
        }
    }catch(AppError){
        return AppError;
    }
}


export const loadChats = async (
    senderId: string,
    receiverId: string,
    chatRepository: ReturnType<ChatRepository>,
    chatRoomRepository: ReturnType<ChatRoomRepository>,
) => {
    try{
        const isChatRoomExists = await chatRoomRepository.getChatRoom(senderId, receiverId);
        if(isChatRoomExists){
            const chats = await chatRepository.getChats(isChatRoomExists.id)
            return {"status":"success", chats}
        }else{
            return {"status":"failed", "message": "no message found"}
        }
    }catch(AppError){
        return AppError;
    }
}


export const loadChatMates = async (
    workerId: string,
    chatRepository: ReturnType<ChatRepository>,
    chatRoomRepository: ReturnType<ChatRoomRepository>,
) => {
    try{
        const isChatRoomExists = await chatRoomRepository.getChatMate(workerId);
        if(isChatRoomExists){
            return {"status":"success", chatRooms: isChatRoomExists}
        }else{
            return {"status":"failed", "message": "no message found"}
        }
    }catch(AppError){
        return AppError;
    }
}