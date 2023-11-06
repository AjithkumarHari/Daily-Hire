import {Schema, model} from "mongoose";

const adminSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true
        }
    }
)

const ADMIN = model("Admin", adminSchema, "admin");

export default ADMIN;