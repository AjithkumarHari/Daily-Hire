import USER from "../models/userModel";
import { User } from "../../../types/User";

export const userRepositoryMongoDB = () => {

    const getUserById = async (id : string) => {
        return await USER.findById(id).select('-password');
    }
    
    const getUserByEmail = async (email : string): Promise<User|null> => {
        return await USER.findOne( {email} );
    }
    
    const addUser = async (user : User) => {
        return await USER.create(user);
    }

    const userActivate =async (email: string) => {
        return await USER.updateOne({email}, {$set:{isActive: true}});
    }
    

    return {
        getUserByEmail,
        getUserById,
        addUser,
        userActivate
    };
    
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;