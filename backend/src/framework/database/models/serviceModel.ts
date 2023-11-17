import {Schema, model} from "mongoose";

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        isListed: {
            type: Boolean,
            default: true
        }
    }
)

const SERVICE = model("Service", serviceSchema, "service");

export default SERVICE;