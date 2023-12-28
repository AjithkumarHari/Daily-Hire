import mongoose from "mongoose";
import configKeys from "../../config";

const connectDB = async () => {
    try{
        await mongoose.connect(configKeys.MONGODB_URL);
        console.log(`Database Connected Successfully`);
        
    }catch(error){
        process.exit(1);
    }
}

export default connectDB;