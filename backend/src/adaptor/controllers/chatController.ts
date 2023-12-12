import { Request , Response} from "express";
import { ChatRepository } from "../../application/repository/chatDbRepository";
import { ChatDbRepositoryMongoDB } from "../../framework/database/repository/chatDbRepository";
import { ChatRoomRepository } from "../../application/repository/chatRoomDbRepository";
import { ChatRoomDbRepositoryMongoDB } from "../../framework/database/repository/chatRoomDbRepository";
import { HttpStatus } from "../../types/HttpStatus";
import { loadChatMates, loadChats, sendChat } from "../../application/useCase/chat/chatUserWorker";


const chatController = ( 
    chatDbRepository : ChatRepository,
    chatDbRepositoryImp : ChatDbRepositoryMongoDB,
    chatRoomDbRepository : ChatRoomRepository,
    chatRoomDbRepositoryImp : ChatRoomDbRepositoryMongoDB,
    

    ) => {
        
    const dbChatRepository = chatDbRepository(chatDbRepositoryImp())
    const dbChatRoomRepository = chatRoomDbRepository(chatRoomDbRepositoryImp())


    const sendMessage = async (req: Request, res: Response) => {
        try{
            const { senderId, receiverId, content } = req.body.data
            const result= await sendChat({senderId, receiverId, content}, dbChatRepository,dbChatRoomRepository)

            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch{
            res.status(500)
        }
    }
    const getMessages = async (req: Request, res: Response) => {
        try{
            const { senderId, receiverId } = req.params;
            const result= await loadChats(senderId, receiverId, dbChatRepository,dbChatRoomRepository);
            
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch{
            res.status(500)
        }
    }
    
    const getChatMates = async (req: Request, res: Response) => {
        try{
            const workerId = req.params.id;
            const result= await loadChatMates(workerId, dbChatRepository,dbChatRoomRepository);
            
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch{
            res.status(500)
        }
    }

    return {
        sendMessage,
        getMessages,
        getChatMates,
    };
};

export default chatController;