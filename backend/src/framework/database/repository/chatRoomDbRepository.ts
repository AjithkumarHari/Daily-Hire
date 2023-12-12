import { idText } from "typescript";
import CHATROOM from "../models/chatRoomModel";
import mongoose from "mongoose";


export const chatRoomDbRepositoryMongoDB = () => {
 
    const getChatRoom = async (senderId: string, receiverId: string) => {
        return await CHATROOM.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        })
    }

    const addChatRoom = async (senderId: string, receiverId: string) => {
        return await CHATROOM.create( { senderId, receiverId })
    }

    const getChatMate = async(id: string) => {
        return await CHATROOM 
        .aggregate([
            {
                $match:{
                    $or: [
                        { senderId: new mongoose.Types.ObjectId(id) },
                        { receiverId: new mongoose.Types.ObjectId(id) }
                    ]
                }
            },
            {
                $lookup: {
                  from: 'users',
                  let: { chatUserId: {
                    $cond: {
                      if: { $eq: ["$senderId", new mongoose.Types.ObjectId(id)] },
                      then: "$receiverId",
                      else: "$senderId"
                    }
                  }},
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ["$_id", "$$chatUserId"] }
                      }
                    }
                  ],
                  as: 'userDetails'
                }
              },
            {
                $unwind: '$userDetails',
            },
            {
                $project: {
                    chatRoomId: '_id',
                    senderId: 1,
                    receiverId: 1,
                    userName: '$userDetails.name',
                    userId: '$userDetails._id',
                },
            },
        ]);
        
    }

    return {
        getChatRoom,
        addChatRoom,
        getChatMate,
    }
}

export type ChatRoomDbRepositoryMongoDB = typeof chatRoomDbRepositoryMongoDB;
