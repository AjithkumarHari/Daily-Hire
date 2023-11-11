import { User } from "../../../types/User";
import { UserDbInterface } from "../../repository/userDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";
import { GoogleAuthServiceInterface } from "../../service/googleAuthServiceInterface";
import { OtpServiceInterface } from "../../service/otpServiceInterface";
import AppError from "../../../util/appError"; 
import { HttpStatus } from "../../../types/HttpStatus";

export const userSignup = async (
    user: {name: string, phone: number, email: string, password: string},
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    otpService: ReturnType<OtpServiceInterface>
) => { 
    try{
        user.email = user.email.toLowerCase(); 

        const isUserExist = await userRepository.getUserByEmail(user.email)
        if(isUserExist){
            throw new AppError("email already exits",HttpStatus.UNAUTHORIZED);
        }
        user.password = await authService.encryptPassword(user.password);
        await userRepository.addUser(user);
        await otpService.sendOtp(user.phone);
        const { name, email, phone } = user;
        return {status: "success", userData:{name, email, phone}};
    }catch(AppError){
        return AppError;
    }
    
}

export const resendOtp = async (
    phoneNumber: number,
    otpService: ReturnType<OtpServiceInterface>
) => { 
    try {
        await otpService.sendOtp(phoneNumber);
        return {status: "success"};
        
    } catch (error) {
        console.log(error);
        
    }
 
    
}

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    otpService: ReturnType<OtpServiceInterface>
) => {
    try{
        const user: User | null = await userRepository.getUserByEmail(email);
        if(!user){
            throw new AppError("User not exists",HttpStatus.UNAUTHORIZED);
        }
        if(user.password){
            const isPasswordCorrect = await authService.comparePassword(password, user.password);
            if(!isPasswordCorrect){
                throw new AppError("Password does not match",HttpStatus.UNAUTHORIZED);
            }
        }
        if(!user.isActive && user.phone){
            await otpService.sendOtp(user.phone);
            const { name, email, phone } = user;
            return {"status": "pending", userData:{name, email, phone}};
        }
        if(user._id){
            const token = authService.generateToken(user._id.toString());
            return {"status": "success",token};
        }
    }catch(AppError){
        return AppError;
    }
}

export const signInWithGoogle = async(
    credentials: string,
    googleAuthService: ReturnType<GoogleAuthServiceInterface>,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    
    const user: User = await googleAuthService.verify(credentials);
    const isUserExist = await userRepository.getUserByEmail(user.email);
    if(isUserExist && isUserExist._id){
        const token = authService.generateToken(isUserExist._id.toString());
        return token
    }else{
        const { _id: userId } = await userRepository.addUser(user);
        const token = authService.generateToken(userId.toString());
        return token
    }
}

export const otpVerification = async (
    data:{
        email: string,
        phoneNumber: number,
        code: string
    },
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    otpService: ReturnType<OtpServiceInterface>,
) => {
    try{
        const isOtpVaild = await otpService.verifyOtp(data.phoneNumber, data.code);
    
        if(isOtpVaild){
            await userRepository.userActivate(data.email);
            const user = await userRepository.getUserByEmail(data.email);
            if(user?._id){
                const token = authService.generateToken(user._id)
                return {"status":"success",token};
            }
        }else{
            throw new AppError("OTP does not match",HttpStatus.UNAUTHORIZED);
        }

    } catch(AppError) {
        return AppError;
    }
    
}