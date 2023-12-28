import express from "express";
import workerController from "../../../adaptor/controllers/workerController";
import { workerDbRepository } from "../../../application/repository/workerDbRepository";
import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository"; 
import { serviceDbRepository } from "../../../application/repository/serviceDbRepository";
import { serviceDbRepositoryMongoDB } from "../../database/repository/serviceDbRepository.";
import { bookingDbRepository } from "../../../application/repository/bookingDbRepository";
import { bookingDbRepositoryMongoDB } from "../../database/repository/bookingDbRepository";

const workerRouter = () => {
    const router = express.Router()
    
    const controller = workerController(
        workerDbRepository,
        workerRepositoryMongoDB,
        serviceDbRepository,
        serviceDbRepositoryMongoDB,
        bookingDbRepository,
        bookingDbRepositoryMongoDB,
    )

    router.get('/service-list',controller.getAllServices);

    router.get('/bookings/:id',controller.getBookingByWorker);
    
    router.put('/cancel-booking',controller.cancelBooking);

    router.put('/block-booking',controller.blockBooking);
    
    router.put('/unblock-booking',controller.unBlockBooking);

    router.get('/worker-stats/:id',controller.getStatistics);

    router.put('/edit-worker',controller.updateWorkerProfile);

    return router;
}

export default workerRouter;