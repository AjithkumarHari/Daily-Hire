import express from "express";
import chatController from "../../../adaptor/controllers/chatController";
import { chatDbRepository } from "../../../application/repository/chatDbRepository";
import { chatDbRepositoryMongoDB } from "../../database/repository/chatDbRepository";
import { chatRoomDbRepository } from "../../../application/repository/chatRoomDbRepository";
import { chatRoomDbRepositoryMongoDB } from "../../database/repository/chatRoomDbRepository";

const chatRouter = () => {
    const router = express.Router()
    
    const controller = chatController(
        chatDbRepository,
        chatDbRepositoryMongoDB,
        chatRoomDbRepository,
        chatRoomDbRepositoryMongoDB,
    )

    router.get('/load-chats/:senderId/:receiverId',controller.getMessages);
    
    router.put('/send-chat',controller.sendMessage);

    router.get('/load-chatmates/:id',controller.getChatMates);
    
    return router;
}

export default chatRouter;