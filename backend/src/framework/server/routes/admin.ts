import express from "express";
import adminController from "../../../adaptor/controllers/adminController";
import { userDbRepository } from "../../../application/repository/userDbRepository"; 
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { workerDbRepository } from "../../../application/repository/workerDbRepository";
import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository"; 
import { serviceDbRepository } from "../../../application/repository/serviceDbRepository";
import { serviceDbRepositoryMongoDB } from "../../database/repository/serviceDbRepository.";
import { reviewDbRepository } from "../../../application/repository/reviewDbRepository";
import { reviewDbRepositoryMongoDB } from "../../database/repository/reviewDbrepository";

const adminRouter = () => {
    const router = express.Router()
    
    const controller = adminController(
        userDbRepository,
        userRepositoryMongoDB,
        workerDbRepository,
        workerRepositoryMongoDB,
        serviceDbRepository,
        serviceDbRepositoryMongoDB,
        reviewDbRepository,
        reviewDbRepositoryMongoDB,
        )


    router.get('/user-list',controller.getAllUser);

    router.get('/worker-list',controller.getAllWorkers);

    router.put('/user-status',controller.userStatusChange);

    router.put('/worker-status',controller.workerStatusChange)

    router.post('/add-service',controller.createService);

    router.put('/edit-service',controller.updateService)

    router.put('/service-status',controller.serviceStatusChange)

    router.get('/service-list',controller.getAllServices)

    router.get('/service-details/:id',controller.getServicesById)

    router.get('/review-list',controller.getAllReviews)

    return router
}

export default adminRouter;