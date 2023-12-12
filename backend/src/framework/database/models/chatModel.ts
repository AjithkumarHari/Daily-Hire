import mongoose, {Schema, model} from "mongoose";

const chatSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        chatRoomId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        }
    }
)

const CHAT = model("Chat", chatSchema, "chat");

export default CHAT;