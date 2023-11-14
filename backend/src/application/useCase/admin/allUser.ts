import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { UserDbInterface } from "../../repository/userDbRepository";

export const allUsers = async (userRepository: ReturnType<UserDbInterface>) => {
    try {
        const user: any = await userRepository.getAllUsers();

        if(!user)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);

        return user;
    } catch (AppError) {
        return AppError;
    }
}