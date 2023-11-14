import express from "express";
import adminController from "../../../adaptor/controllers/adminController";
import { userDbRepository } from "../../../application/repository/userDbRepository"; 
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { workerDbRepository } from "../../../application/repository/workerDbRepository";
import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository"; 


const adminRouter = () => {
    const router = express.Router()
    
    const controller = adminController(userDbRepository, userRepositoryMongoDB,workerDbRepository,workerRepositoryMongoDB, )

    router.get('/user-list',controller.getAllUser);

    router.get('/worker-list',controller.getAllWorkers);

    router.put('/user-status',controller.userStatusChange);

    router.put('/worker-status',controller.workerStatusChange)

    return router
}

export default adminRouter;