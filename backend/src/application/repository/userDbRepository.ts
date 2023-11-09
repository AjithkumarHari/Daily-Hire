import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { User } from "../../types/User";

export const userDbRepository = (repository : ReturnType<UserRepositoryMongoDB>) => {

    const getUserById = async (id:string) => await repository.getUserById(id);
    
    const addUser = async (user: User) => await repository.addUser(user);
    
    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email);

    const getUserByNumber = async (phone: number) => await repository.getUserByNumber(phone);

    const userActivate = async (email: string) => await repository.userActivate(email);
    
    return {
        getUserByEmail,
        addUser,
        getUserById,
        getUserByNumber,
        userActivate
    }
}

export type UserDbInterface = typeof userDbRepository;