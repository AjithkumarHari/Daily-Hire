import express from "express";
import authController from "../../../adaptor/controllers/authController";
import { userDbRepository } from "../../../application/repository/userDbRepository";
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { authService } from "../../service/authService";
import { authServiceInterface } from "../../../application/service/authServiceInterface";

const authRouter = () => {
    const route = express.Router();

    const controller = authController(
        userDbRepository,
        userRepositoryMongoDB,
        authServiceInterface,
        authService,
    );

    route.post('/user-signup',controller.registerUser);

    route.post('/user-login',controller.loginUser)

    return route;
}

export default authRouter;