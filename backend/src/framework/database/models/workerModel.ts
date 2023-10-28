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
        wage_for_day: {
            type: Number,
            require: true
        },
        wage_for_hour: {
            type: Number,
            require: true
        },
        profile_img: {
            type: String,
        }
    }
)

const WORKER = model("Worker",workerShcema,"workers");

export default WORKER;