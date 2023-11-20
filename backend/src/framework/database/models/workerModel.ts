import { Schema,model } from "mongoose";

const workerShcema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        age: {
            type: Number,
            require: true
        },
        work: {
            type: String,
            require: true
        },
        experience: {
            type: String,
            require: true
        },
        gender: {
            type: String,
            require: true
        },
        wageForDay: {
            type: Number,
            require: true
        },
        wageForHour: {
            type: Number,
            require: true
        },
        location: {
            type: String,
            require: true
        },
        profileImg: {
            type: String,
        },
        isListed: {
            type: Boolean,
            default: true
        },
        isActive: {
            type: Boolean,
            default: false
        },
    }
)

const WORKER = model("Worker",workerShcema,"workers");

export default WORKER;