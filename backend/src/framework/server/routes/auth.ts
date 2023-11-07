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
    );

    route.post('/user-login',controller.loginUser);

    route.post('/user-signup',controller.registerUser);

    route.post('/worker-login',controller.loginWorker); 

    route.post('/worker-signup',controller.registerWorker);

    route.post('/admin-login',controller.loginAdmin);

    route.post('/user-google-signin',controller.loginWithGoogle)

    return route;
}

export default authRouter;