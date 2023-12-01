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

    const getAllUser = async () => {
        return await USER.find().select('-password');
    }

    const userlistUnlist = async (_id: string, newStatus: boolean) => {
        return await USER.updateOne({_id}, {$set:{isListed: newStatus}});
    }
    
    const updateUser =async (_id:string, user: User) => {
        return await USER.updateOne({_id},{...user});
    }

    return {
        getUserByEmail,
        getUserById,
        addUser,
        userActivate,
        getAllUser,
        userlistUnlist,
        updateUser,
    };
    
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;