import { Request, Response } from "express";
import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { AdminRepository } from "../../application/repository/adminDbRepository";
import { AdminDbRepositoryMongoDb } from "../../framework/database/repository/adminDbRepository";
import { AuthService } from "../../framework/service/authService";
import { AuthServiceInterface } from "../../application/service/authServiceInterface";
import { userLogin, userSignup } from "../../application/useCase/auth/userAuth";
import { adminLogin } from "../../application/useCase/auth/adminAuth";
import AppError from "../../util/appError";

const authController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    adminDbRepository: AdminRepository,
    adminDbRepositoryImp: AdminDbRepositoryMongoDb,
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService
) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImp());
    const dbAdminRepository = adminDbRepository(adminDbRepositoryImp());
    const authService = authServiceInterface(authServiceImpl());

    const registerUser = async ( req: Request, res: Response) => {
        const user:{name: string, phone: number, email: string, password: string}= req.body;
        const result = await userSignup(user, dbUserRepository, authService);
        
        if(result instanceof AppError){
             res.json({
                ...result,
                status: "failed",
                })
        }else{
            res.json({
                status: "success",
                message: "successfully added new user",
                token: result
            });
        }
    }

    const loginUser = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const result = await userLogin(email, password, dbUserRepository, authService);

        if(result instanceof AppError){
            res.json({
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
            res.json({
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

    return {
        registerUser,
        loginUser,
        loginAdmin
    }

}

export default authController;