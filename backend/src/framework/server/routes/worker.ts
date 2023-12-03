import express from "express";
import userController from "../../../adaptor/controllers/userController";
import workerController from "../../../adaptor/controllers/workerController";
import { userDbRepository } from "../../../application/repository/userDbRepository"; 
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { workerDbRepository } from "../../../application/repository/workerDbRepository";
import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository"; 
import { serviceDbRepository } from "../../../application/repository/serviceDbRepository";
import { serviceDbRepositoryMongoDB } from "../../database/repository/serviceDbRepository.";
import { bookingDbRepository } from "../../../application/repository/bookingDbRepository";
import { bookingDbRepositoryMongoDB } from "../../database/repository/bookingDbRepository";
import { walletDbRepository } from "../../../application/repository/walletDbRepository";
import { walletDbRepositoryMongoDB } from "../../database/repository/walletDbRepository";
import { reviewDbRepository } from "../../../application/repository/reviewDbRepository";
import { reviewDbRepositoryMongoDB } from "../../database/repository/reviewDbrepository";
import { paymentServiceInterface } from "../../../application/service/paymentServiceInterface";
import { paymentService } from "../../service/paymentService";
import { authService } from "../../service/authService";
import { authServiceInterface } from "../../../application/service/authServiceInterface";

const workerRouter = () => {
    const router = express.Router()
    
    const controller = workerController(
        // userDbRepository,
        // userRepositoryMongoDB,
        workerDbRepository,
        workerRepositoryMongoDB,
        serviceDbRepository,
        serviceDbRepositoryMongoDB,
        bookingDbRepository,
        bookingDbRepositoryMongoDB,
        // walletDbRepository,
        // walletDbRepositoryMongoDB,
        // reviewDbRepository,
        // reviewDbRepositoryMongoDB,
        // paymentServiceInterface,
        // paymentService,
        // authServiceInterface,
        // authService,
    )

    router.get('/service-list',controller.getAllServices);

    router.get('/bookings/:id',controller.getBookingByWorker);
    
    router.put('/cancel-booking',controller.cancelBooking);

    router.put('/block-booking',controller.blockBooking);

    return router;
}

export default workerRouter;