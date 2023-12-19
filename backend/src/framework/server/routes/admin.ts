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
import { bookingDbRepository } from "../../../application/repository/bookingDbRepository";
import { bookingDbRepositoryMongoDB } from "../../database/repository/bookingDbRepository";
import { complaintDbRepository } from "../../../application/repository/complaintDbRepository";
import { complaintDbRepositoryMongoDB } from "../../database/repository/complaintDbRepository";
import { walletDbRepository } from "../../../application/repository/walletDbRepository";
import { walletDbRepositoryMongoDB } from "../../database/repository/walletDbRepository";

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
        bookingDbRepository,
        bookingDbRepositoryMongoDB,
        complaintDbRepository,
        complaintDbRepositoryMongoDB,
        walletDbRepository,
        walletDbRepositoryMongoDB,
        )


    router.get('/user-list',controller.getAllUser);

    router.get('/worker-list',controller.getAllWorkers);

    router.put('/user-status',controller.userStatusChange);

    router.put('/worker-status',controller.workerStatusChange);

    router.post('/add-service',controller.createService);

    router.put('/edit-service',controller.updateService);

    router.put('/service-status',controller.serviceStatusChange);

    router.get('/service-list',controller.getAllServices);

    router.get('/service-details/:id',controller.getServicesById);

    router.get('/review-list',controller.getAllReviews);

    router.put('/review-status',controller.reviewStatusChange);

    router.get('/booking-list',controller.getAllBookings);

    router.put('/booking-status',controller.bookingStatusChange);
    
    router.get('/app-statics',controller.getStatistics);

    router.get('/complaint-list',controller.getAllComplaints);

    return router
}

export default adminRouter;