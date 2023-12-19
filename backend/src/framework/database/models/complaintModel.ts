import mongoose, {Schema, model} from "mongoose";

const complaintSchema = new Schema(
    {
        workerId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
            required: true
        },
        workerName:{
            type: String,
            require: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom',
            required: true
        },
        userName:{
            type: String,
            require: true
        },
        complaint: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        type:{
            type: String,
            require: true
        },
    }
)

const COMPLAINT = model("Complaint", complaintSchema, "complaint");

export default COMPLAINT;