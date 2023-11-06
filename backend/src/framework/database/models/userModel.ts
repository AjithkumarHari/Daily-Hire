import { model, Schema} from "mongoose";

const userShcema = new Schema(
    {
        name :{
            type : String,
            require : true,
        },
        phone :{
            type : Number,
            require : true
        },
        email :{
            type : String,
            require : true 
        },
        password : {
            type : String,
            require : true
        }
    }
)

const USER = model("User", userShcema, "users");

export default USER;