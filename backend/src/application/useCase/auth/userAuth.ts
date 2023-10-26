import { User } from "../../../types/User";
import { UserDbInterface } from "../../repository/userDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";

export const userSignup = async (
    user: {name: string, phone: number, email: string, password: string},
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => { 
    user.email = user.email.toLowerCase(); 

    const isUserExist = await userRepository.getUserByEmail(user.email)
    if(isUserExist){
        throw new Error("user already exits");
    }
    user.password = await authService.encryptPassword(user.password);
    const {_id: userId} = await userRepository.addUser(user);
    return authService.generateToken(userId.toString())
}

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    const user: User | null = await userRepository.getUserByEmail(email);
    if(!user){
        throw new Error("User not exists");
    }
    const isPasswordCorrect = authService.comparePassword(password, user.password);
    if(!isPasswordCorrect){
        throw new Error("password does nopt match");
    }
    if(user._id)
        return authService.generateToken(user._id.toString())
}