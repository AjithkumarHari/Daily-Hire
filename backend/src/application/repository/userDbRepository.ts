import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";

export const userDbRepository = (repository : ReturnType<UserRepositoryMongoDB>) => {

    const getUserById = async (id:string) => await repository.getUserById(id);
    
    const addUser = async (user:{name:string, email:string, password:string}) => {
        return await repository.addUser(user);
    }
    
    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email);
    
    return {
        getUserByEmail,
        addUser,
        getUserById
    }
}

export type UserDbInterface = typeof userDbRepository;