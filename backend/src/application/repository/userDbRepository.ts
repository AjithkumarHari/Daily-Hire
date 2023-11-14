import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { User } from "../../types/User";

export const userDbRepository = (repository : ReturnType<UserRepositoryMongoDB>) => {

    const getUserById = async (id:string) => await repository.getUserById(id);
    
    const addUser = async (user: User) => await repository.addUser(user);
    
    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email);

    const userActivate = async (email: string) => await repository.userActivate(email);

    const getAllUsers = async () =>  await repository.getAllUser();

    const userListUnlist = async (userId: string, newStatus: boolean) => await repository.userlistUnlist(userId, newStatus);

    return {
        getUserByEmail,
        addUser,
        getUserById,
        userActivate,
        getAllUsers,
        userListUnlist
    }
}

export type UserDbInterface = typeof userDbRepository;