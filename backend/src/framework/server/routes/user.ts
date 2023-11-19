import express from "express";
import userController from "../../../adaptor/controllers/userController";
import { userDbRepository } from "../../../application/repository/userDbRepository"; 
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { workerDbRepository } from "../../../application/repository/workerDbRepository";
import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository"; 
import { serviceDbRepository } from "../../../application/repository/serviceDbRepository";
import { serviceDbRepositoryMongoDB } from "../../database/repository/serviceDbRepository.";

const userRouter = () => {
    const router = express.Router()
    
    const controller = userController(workerDbRepository,workerRepositoryMongoDB,serviceDbRepository,serviceDbRepositoryMongoDB)

    router.get('/worker-list',controller.getAllWorkers);

    router.get('/worker-details/:id',controller.getWorkerById);

    router.get('/service-list',controller.getAllServices)

    return router
}

export default userRouter;