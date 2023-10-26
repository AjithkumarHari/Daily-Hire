import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";

export const userDbRepository = (repository : ReturnType<UserRepositoryMongoDB>) => {

    const getUser = async (id:string) => {
        
        return await repository.getUser(id);
    }

    const addUser = async (user:{name:string, email:string, password:string}) => {

        return await repository.addUser(user);
 
    }
    
    
    return {
        getUser,
        addUser
    }
}

export type UserDbInterface = typeof userDbRepository;