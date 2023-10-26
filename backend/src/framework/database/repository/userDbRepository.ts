import USER from "../models/userModel";
import { User } from "../../../types/User";

export const userRepositoryMongoDB = () => {
    const getUser = async (id : string) => {
        return await USER.findById(id).select('-password');
        
    }
    const addUser = async (user : User) => {
        await USER.create(user);
        return {status : "success"};
    }
    return {
        getUser,
        addUser
    }
    
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;