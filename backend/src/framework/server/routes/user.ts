import express from "express";
import userController from "../../../adaptor/controllers/userController";
import { userDbRepository } from "../../../application/repository/userDbRepository"; 
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";

const userRouter = () => {
    const router = express.Router()
    
    const controller = userController(userDbRepository,userRepositoryMongoDB)

    router.get('/',controller.sample)

    return router
}

export default userRouter;