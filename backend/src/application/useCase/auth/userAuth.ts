import { User } from "../../../types/User";
import { UserDbInterface } from "../../repository/userDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";
import AppError from "../../../util/appError"; 
import { HttpStatus } from "../../../types/HttpStatus";

export const userSignup = async (
    user: {name: string, phone: number, email: string, password: string},
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => { 
    try{
        user.email = user.email.toLowerCase(); 

        const isUserExist = await userRepository.getUserByEmail(user.email)
        if(isUserExist){
            throw new AppError("email already exits",HttpStatus.UNAUTHORIZED);
        }
        user.password = await authService.encryptPassword(user.password);
        const {_id: userId} = await userRepository.addUser(user);
        return authService.generateToken(userId.toString())
    }catch(AppError){
        return AppError;
    }
    
}

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    try{
        const user: User | null = await userRepository.getUserByEmail(email);
        if(!user){
            throw new AppError("User not exists",HttpStatus.UNAUTHORIZED);
        }
        const isPasswordCorrect = await authService.comparePassword(password, user.password);
        if(!isPasswordCorrect){
            throw new AppError("password does not match",HttpStatus.UNAUTHORIZED);
        }
        if(user._id)
            return authService.generateToken(user._id.toString())
    }catch(AppError){
        return AppError;
    }
}