import { User } from "../../../types/User";
import { UserDbInterface } from "../../repository/userDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";
import { GoogleAuthServiceInterface } from "../../service/googleAuthServiceInterface";
import { OtpServiceInterface } from "../../service/otpServiceInterface";
import AppError from "../../../util/appError"; 
import { HttpStatus } from "../../../types/HttpStatus";
import { WalletRepository } from "../../repository/walletDbRepository";

export const userSignup = async (
    user: {name: string, phone: number, email: string, password: string},
    userRepository: ReturnType<UserDbInterface>,
    walletRepository: ReturnType<WalletRepository>,
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
        const res = await userRepository.addUser(user);
        await walletRepository.createWallet({userId: res.id, balance: 0})
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
    userEmail: string,
    userPassword: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    otpService: ReturnType<OtpServiceInterface>
) => {
    try{
        const user: User | null = await userRepository.getUserByEmail(userEmail);
        if(!user){
            throw new AppError("User not exists",HttpStatus.UNAUTHORIZED);
        }
        else{
            const {_id, name, email, phone ,password, isActive } = user;
            if(password){
                const isPasswordCorrect = await authService.comparePassword(userPassword, password);
                if(!isPasswordCorrect){
                    throw new AppError("Password does not match",HttpStatus.UNAUTHORIZED);
                }
            }
            if(!isActive && phone){
                await otpService.sendOtp(phone);
                return {"status": "pending", userData:{name, email, phone}};
            }
            if(_id){
                const token = authService.generateToken(_id.toString());
                return {"status": "success", token, userData:{_id, name, email, phone}};
            }
        }
    }catch(AppError){
        return AppError;
    }
}

export const signInWithGoogle = async(
    credentials: string,
    userRepository: ReturnType<UserDbInterface>,
    walletRepository: ReturnType<WalletRepository>,
    googleAuthService: ReturnType<GoogleAuthServiceInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    
    const user: User = await googleAuthService.verify(credentials);
    const {_id, name, email } = user;
    const isUserExist = await userRepository.getUserByEmail(user.email);
    if(isUserExist && isUserExist._id){
        const token = authService.generateToken(isUserExist._id.toString());
        return {token, userData:{_id, name, email} }
    }else{
        const { _id: userId } = await userRepository.addUser(user);
        await walletRepository.createWallet({userId: userId.toString(), balance: 0})
        const token = authService.generateToken(userId.toString());
        return {token, userData:{_id, name, email} }
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
                const {_id, name, email, phone } = user;
                return {"status":"success", token, userData:{_id, name, email, phone}};
            }
        }else{
            throw new AppError("OTP does not match",HttpStatus.UNAUTHORIZED);
        }

    } catch(AppError) {
        return AppError;
    }
    
}