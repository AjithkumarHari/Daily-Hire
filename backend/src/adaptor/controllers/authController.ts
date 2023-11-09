import { Request, Response } from "express";
import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { AdminRepository } from "../../application/repository/adminDbRepository";
import { AdminDbRepositoryMongoDb } from "../../framework/database/repository/adminDbRepository";
import { AuthServiceInterface } from "../../application/service/authServiceInterface";
import { AuthService } from "../../framework/service/authService";
import { GoogleAuthServiceInterface } from "../../application/service/googleAuthServiceInterface";
import { GoogleAuthService } from "../../framework/service/googleAuthService";
import { OtpServiceInterface } from "../../application/service/otpServiceInterface";
import { OtpService } from "../../framework/service/otpService";
import { signInWithGoogle, userLogin, userSignup, otpVerification } from "../../application/useCase/auth/userAuth";
import { workerSignup, workerLogin } from "../../application/useCase/auth/workerAuth";
import { adminLogin } from "../../application/useCase/auth/adminAuth";
import AppError from "../../util/appError";

const authController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    adminDbRepository: AdminRepository,
    adminDbRepositoryImp: AdminDbRepositoryMongoDb,
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    googleAuthServiceInterface:GoogleAuthServiceInterface,
    googleAuthServiceImpl:GoogleAuthService,
    otpServiceInterface:OtpServiceInterface,
    otpServiceImpl:OtpService,
) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImp());
    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());
    const dbAdminRepository = adminDbRepository(adminDbRepositoryImp());
    const authService = authServiceInterface(authServiceImpl());
    const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());
    const otpService = otpServiceInterface(otpServiceImpl());

    const registerUser = async ( req: Request, res: Response) => {
        
        const user:{name: string, phone: number, email: string, password: string}= req.body;
        
        const result = await userSignup(user, dbUserRepository, authService, otpService);
        
        if(result instanceof AppError){
            res.status(result.errorCode).json({
                ...result
                })
        }else{
            res.json({
                result,
                message: "successfully added new user",
            });
        }
    }

    const userOtpVerify = async (req: Request, res: Response) => {
        
        const data = req.body;
        const result = await otpVerification(data, dbUserRepository, otpService);

        res.send(result);

    }

    const loginUser = async (req: Request, res: Response) => {
        
        const {email, password} = req.body;
        const result = await userLogin(email, password, dbUserRepository, authService);

        if(result instanceof AppError){
            res.status(result.errorCode).json({
               ...result,
               status: "failed",
               })
       }else{
            res.json({
                status: "success",
                message: "user logged in successfully",
                token: result
            });
        }
    }

    const loginAdmin = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const result = await adminLogin(email, password, dbAdminRepository, authService);
        if(result instanceof AppError){
            res.status(result.errorCode).json({
                ...result,
                status: "failed",
            })
        }else{
            res.json({
                status: "success",
                message: "admin logged in successfully",
                token: result 
            })
        }
    }

    const registerWorker = async ( req: Request, res: Response) => {
        const worker = req.body;
        const result = await workerSignup(worker, dbWorkerRepository, authService);
        if(result instanceof AppError){
            res.status(result.errorCode).json({
                ...result,
                status: "failed",
                })
        }else{
            res.json({
                result,
                message: "successfully added new worker",

            });
        }
    }

    const loginWorker = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const result = await workerLogin(email, password, dbWorkerRepository, authService);

        if(result instanceof AppError){
            res.status(result.errorCode).json({
               ...result,
               status: "failed",
               })
       }else{
            res.json({
                status: "success",
                message: "worker logged in successfully",
                token: result
            });
        }
    } 

    const loginWithGoogle =async (req: Request, res: Response) => {
        
        const credentials: string = req.body.idToken;
         
        const token = await signInWithGoogle(credentials, googleAuthService, dbUserRepository, authService);
        res.json({
            status:"success",
            message:"user Google auth success",
            token
          })
    }

    

    return {
        registerUser,
        loginUser,
        registerWorker,
        loginWorker,
        loginAdmin,
        loginWithGoogle,
        userOtpVerify
    }

}

export default authController;