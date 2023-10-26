// import  user  from "../../../entities/user"
import { UserDbInterface } from "../../repository/userDbRepository";

export const addNewUser = async (
    user: {name:string, email:string, password:string},
    dbRepositoryUser : ReturnType<UserDbInterface>
) => {

    
     
    return dbRepositoryUser.addUser(user);
}