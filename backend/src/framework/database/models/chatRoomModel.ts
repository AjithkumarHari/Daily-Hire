import mongoose, {Schema, model} from "mongoose";

const chatRoomSchema = new Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
            required: true
        }    
    }
)

const CHATROOM = model("ChatRoom", chatRoomSchema, "chatRoom");

export default CHATROOM;