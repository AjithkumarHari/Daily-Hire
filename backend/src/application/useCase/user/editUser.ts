import { HttpStatus } from "../../../types/HttpStatus";
import { User } from "../../../types/User";
import AppError from "../../../util/appError";
import { UserDbInterface } from "../../repository/userDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";

export const editUser = async (
    userId: string,
    user: User,
    userRepository : ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    try {
        const isUserExist = await userRepository.getUserById(userId);
        if(!isUserExist){
            throw new AppError("Service not exits",HttpStatus.UNAUTHORIZED);
        }else{
            if(user.password)
                user.password = await authService.encryptPassword(user.password);
            await userRepository.updateUser(userId,user);
            const newUserData = await userRepository.getUserById(userId);
            if(newUserData){
                const { _id, name, phone, email} = newUserData;
                return {status: "success",message: `user data is updated`, userData:  { _id, name, phone, email} };
            }
        }
    } catch (AppError) {
        return AppError;
    }
    
}