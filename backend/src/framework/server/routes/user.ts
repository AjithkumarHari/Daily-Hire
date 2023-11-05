import express from "express";
import userController from "../../../adaptor/controllers/userController";
import { userDbRepository } from "../../../application/repository/userDbRepository"; 
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { workerDbRepository } from "../../../application/repository/workerDbRepository";
import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository"; 

const userRouter = () => {
    const router = express.Router()
    
    const controller = userController(workerDbRepository,workerRepositoryMongoDB)

    router.get('/worker-list',controller.getAllWorkers)

    router.get('/worker-details/:id',controller.getWorkerById)

    return router
}

export default userRouter;