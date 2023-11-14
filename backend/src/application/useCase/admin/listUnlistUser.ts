import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { UserDbInterface } from "../../repository/userDbRepository";

export const listUnlistUser = async (userId:string, userRepository: ReturnType<UserDbInterface>) => {
    try {
        const user = await userRepository.getUserById(userId); 
        if(user){
            const result: any = await userRepository.userListUnlist(userId, !user.isListed);
            if(!result)
                throw new AppError("Not Found", HttpStatus.NOT_FOUND);
            return {status: "success", message:"worker status change success"};
        }
        throw new AppError("Worker Not Found", HttpStatus.NOT_FOUND);
    } catch (AppError) {
        return AppError;
    }
}