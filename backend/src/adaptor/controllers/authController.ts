import { Request, Response } from "express";
import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { AuthService } from "../../framework/service/authService";
import { AuthServiceInterface } from "../../application/service/authServiceInterface";
import { userLogin, userSignup } from "../../application/useCase/auth/userAuth";

const authController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService
) => {
    const dBUserRepository = userDbRepository(userDbRepositoryImp());
    const authService = authServiceInterface(authServiceImpl());

    const registerUser = async ( req: Request, res: Response) => {
        const user:{name: string, phone: number, email: string, password: string}= req.body;
        const token = await userSignup(user, dBUserRepository, authService);
        res.json({
            status: "success",
            message: "user added successfully",
            token: token
        });
    }

    const loginUser = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const token = await userLogin(email, password, dBUserRepository, authService);
        res.json({
            status: "success",
            message: "user logged in successfully",
            token: token
        });
    }

    return {
        registerUser,
        loginUser
    }

}

export default authController;