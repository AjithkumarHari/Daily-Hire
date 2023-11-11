import express from "express";
import authController from "../../../adaptor/controllers/authController";
import { userDbRepository } from "../../../application/repository/userDbRepository";
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { workerDbRepository } from "../../../application/repository/workerDbRepository";
import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository";
import { adminDbRepository } from "../../../application/repository/adminDbRepository";
import { adminDbRepositoryMongoDB } from "../../database/repository/adminDbRepository";
import { authService } from "../../service/authService";
import { authServiceInterface } from "../../../application/service/authServiceInterface";
import { googleAuthService } from "../../service/googleAuthService";
import { googleAuthServiceInterface } from "../../../application/service/googleAuthServiceInterface";
import { otpService } from "../../service/otpService";
import { otpServiceInterface } from "../../../application/service/otpServiceInterface";

const authRouter = () => {
    const route = express.Router();

    const controller = authController(
        userDbRepository,
        userRepositoryMongoDB,
        workerDbRepository,
        workerRepositoryMongoDB,
        adminDbRepository,
        adminDbRepositoryMongoDB,
        authServiceInterface,
        authService,
        googleAuthServiceInterface,
        googleAuthService,
        otpServiceInterface,
        otpService,
    );

    route.post('/user-login',controller.loginUser);

    route.post('/user-signup',controller.registerUser);

    route.post('/worker-login',controller.loginWorker); 

    route.post('/worker-signup',controller.registerWorker);

    route.post('/admin-login',controller.loginAdmin);

    route.post('/user-google-signin',controller.loginWithGoogle)

    route.post('/user-otp',controller.userOtpVerify)

    route.post('/user-resend-otp',controller.resendUserOtp)

    return route;
}

export default authRouter; 