import { UserDbInterface } from "../../repository/userDbRepository";

export const findById =async (userId:string,dbRepositoryUser:ReturnType<UserDbInterface>) => {
   
   return await dbRepositoryUser.getUser(userId)
 
}