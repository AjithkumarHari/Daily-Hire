import { Request , Response} from "express";
// import { UserDbInterface } from "../../application/repository/userDbRepository";
// import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { ServiceRepository } from "../../application/repository/serviceDbRepository";
import { ServiceDbRepositoryMongoDB } from "../../framework/database/repository/serviceDbRepository.";
import { BookingRepository } from "../../application/repository/bookingDbRepository";
import { BookingDbRepositoryMongoDB } from "../../framework/database/repository/bookingDbRepository";
import { ReviewRepository, reviewDbRepository } from "../../application/repository/reviewDbRepository";
import { ReviewDbRepositoryMongoDB } from "../../framework/database/repository/reviewDbrepository";

import { PaymentServiceInterface } from "../../application/service/paymentServiceInterface";
import { PaymentService } from "../../framework/service/paymentService";
import { allListedWorkers } from "../../application/useCase/worker/allWorkers";
import { HttpStatus } from "../../types/HttpStatus";
import { findById } from "../../application/useCase/worker/findById";
import { Worker } from "../../types/Worker";
import { allListedServices } from "../../application/useCase/service/allService";
import { bookingPayment } from "../../application/useCase/booking/bookingPayment";
import AppError from "../../util/appError";
import { addReview } from "../../application/useCase/review/addReview";
import { findByWorker } from "../../application/useCase/review/findByworker";


const userController = ( 
    // userDbRepository : UserDbInterface,
    // userDbRepositoryImp : UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    serviceDbRepository: ServiceRepository,
    serviceDbRepositoryImp: ServiceDbRepositoryMongoDB,
    bookingDbRepository: BookingRepository,
    bookingDbRepositoryImp: BookingDbRepositoryMongoDB,
    reviewDbRepository: ReviewRepository,
    reviewDbRepositoryImp: ReviewDbRepositoryMongoDB,
    paymentServiceInterface: PaymentServiceInterface,
    paymentServiceImp: PaymentService
    ) => {
        
    // const DbRepositoryUser = userDbRepository(userDbRepositoryImp())

    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());
    const dbServiceRepository = serviceDbRepository(serviceDbRepositoryImp());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImp());
    const dbReviewRepository = reviewDbRepository(reviewDbRepositoryImp());
    const paymentService = paymentServiceInterface(paymentServiceImp());

    const getAllWorkers = async ( req: Request, res: Response ) => {
        try{
            const result: Worker[] | null | unknown= await allListedWorkers(dbWorkerRepository);
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch{
            res.status(500)
        }
    }

    const getWorkerById = async (req: Request, res: Response) => {
        try{
            const workerId: string = req.params.id;
            
            const result: Worker | null | unknown= await findById(workerId, dbWorkerRepository);

            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch{
            res.status(500)
        }
    }
    
    const getAllServices = async ( req: Request, res: Response ) => {
        try {
            const result = await allListedServices(dbServiceRepository)
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch{
            res.status(500)
        }
    }

    const bookingWorker = async ( req: Request, res: Response ) => {
        try{
            const paymentDetails = req.body;
            const result: any = await bookingPayment(paymentDetails,paymentService,dbBookingRepository);
            if (result instanceof AppError) {
                res.status(result.errorCode).json({
                    ...result
                })
            } else {
                res.json({
                    ...result,
                    message: "worker booking successful",
                });
            }
        } catch{
            res.status(500)
        }
    }

    const reviewWorker = async ( req: Request, res: Response ) => {
        try {
            const review = req.body;
            const result: any = await addReview(review, dbReviewRepository);
            if (result instanceof AppError) {
                res.status(result.errorCode).json({
                    ...result
                })
            } else {
                res.json({
                    ...result,
                    message: "review added successfully",
                });
            }
        } catch {
            res.status(500)
        }
    }

    const getReviewByWorkerId = async ( req: Request, res: Response ) => {
        try {
            const workerId = req.params.id;
            const result = await findByWorker(workerId, dbReviewRepository);
            if (result instanceof AppError) {
                res.status(result.errorCode).json({
                    ...result
                })
            } else {
                res.json(result);
            }
        } catch {
            res.status(500);
        }
    }

    return {
        getAllWorkers,
        getWorkerById,
        getAllServices,
        bookingWorker,
        reviewWorker,
        getReviewByWorkerId
    };
};

export default userController;

