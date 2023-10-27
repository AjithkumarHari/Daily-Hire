import USER from "../models/userModel";
import { User } from "../../../types/User";

export const userRepositoryMongoDB = () => {

    const getUserById = async (id : string) => {
        return await USER.findById(id).select('-password');
    }
    
    const getUserByEmail = async (email : string): Promise<User | null> => {
        return await USER.findOne( {email} );
    }
    
    const addUser = async (user : User) => {
        return await USER.create(user);
    }
    

    return {
        getUserByEmail,
        getUserById,
        addUser,
    };
    
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;