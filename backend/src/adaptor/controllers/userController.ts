import { Request , Response} from "express";
import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { ServiceRepository } from "../../application/repository/serviceDbRepository";
import { ServiceDbRepositoryMongoDB } from "../../framework/database/repository/serviceDbRepository.";
import { BookingRepository } from "../../application/repository/bookingDbRepository";
import { BookingDbRepositoryMongoDB } from "../../framework/database/repository/bookingDbRepository";
import { ReviewRepository } from "../../application/repository/reviewDbRepository";
import { ReviewDbRepositoryMongoDB } from "../../framework/database/repository/reviewDbrepository";
import { WalletRepository } from "../../application/repository/walletDbRepository";
import { WalletDbRepositoryMongoDB } from "../../framework/database/repository/walletDbRepository";
import { ComplaintRepository } from "../../application/repository/complaintDbRepository";
import { ComplaintDbRepositoryMongoDB } from "../../framework/database/repository/complaintDbRepository";
import { AuthServiceInterface } from "../../application/service/authServiceInterface";
import { AuthService } from "../../framework/service/authService";
import { PaymentServiceInterface } from "../../application/service/paymentServiceInterface";
import { PaymentService } from "../../framework/service/paymentService";
import { allListedWorkers } from "../../application/useCase/worker/allWorkers";
import { HttpStatus } from "../../types/HttpStatus";
import {  findWorkerById } from "../../application/useCase/worker/findWorkerById";
import { Worker } from "../../types/Worker";
import { allListedServices } from "../../application/useCase/service/allService";
import { bookingPayment } from "../../application/useCase/booking/bookingPayment";
import AppError from "../../util/appError";
import { addReview } from "../../application/useCase/review/addReview";
import { findByWorker } from "../../application/useCase/review/findByWorker";
import { findByUser } from "../../application/useCase/booking/findByUserId";
import { Booking } from "../../types/Booking";
import { cancelBookingRequest } from "../../application/useCase/booking/cancelBookingRequest";
import { editUser } from "../../application/useCase/user/editUser";
import { findByWorkerId } from "../../application/useCase/booking/findByWorkerId";
import { getWallet } from "../../application/useCase/wallet/getWallet";
import { isBooked } from "../../application/useCase/booking/isWorkerBookedByUser";
import { addComplaint } from "../../application/useCase/complaint/addComplaint";


const userController = ( 
    userDbRepository : UserDbInterface,
    userDbRepositoryImp : UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    serviceDbRepository: ServiceRepository,
    serviceDbRepositoryImp: ServiceDbRepositoryMongoDB,
    bookingDbRepository: BookingRepository,
    bookingDbRepositoryImp: BookingDbRepositoryMongoDB,
    reviewDbRepository: ReviewRepository,
    reviewDbRepositoryImp: ReviewDbRepositoryMongoDB,
    walletDbRepository: WalletRepository,
    walletDbRepositoryImp: WalletDbRepositoryMongoDB,
    complaintDbRepository: ComplaintRepository,
    complaintDbRepositoryImp: ComplaintDbRepositoryMongoDB,
    paymentServiceInterface: PaymentServiceInterface,
    paymentServiceImp: PaymentService,
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    ) => {
        
    const dbUserRepository = userDbRepository(userDbRepositoryImp())
    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());
    const dbServiceRepository = serviceDbRepository(serviceDbRepositoryImp());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImp());
    const dbReviewRepository = reviewDbRepository(reviewDbRepositoryImp());
    const dbWalletRepository = walletDbRepository(walletDbRepositoryImp());
    const dbComplaintRepository = complaintDbRepository(complaintDbRepositoryImp())
    const paymentService = paymentServiceInterface(paymentServiceImp());
    const authService = authServiceInterface(authServiceImpl());

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
            
            const result: Worker | null | unknown= await findWorkerById(workerId, dbWorkerRepository);

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
            const result: any = await bookingPayment(paymentDetails,paymentService,dbBookingRepository, dbWalletRepository);
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

    const getBookingByUser = async ( req: Request, res: Response ) => {
        try {
            const userId = req.params.id;
            const result: Booking | null | unknown= await findByUser(userId, dbBookingRepository)
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
    
    const getBookingByWorker = async ( req: Request, res: Response ) => {
        try {
            const workerId = req.params.id;
            const result: Booking | null | unknown= await findByWorkerId(workerId, dbBookingRepository)
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

    const cancelBooking = async ( req: Request, res: Response ) => {
        try {
            const bookingId = req.body.bookingId;
            const result = await cancelBookingRequest(bookingId, dbBookingRepository)
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

    const updateUserProfile = async ( req: Request, res: Response ) => {
        try {
            const { userId, user } = req.body;
            const result = await editUser(userId, user, dbUserRepository, authService);
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

    const getWalletByUser = async ( req: Request, res: Response ) =>{
        try {
            const userId = req.params.id;
            const result = await getWallet(userId, dbWalletRepository)
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

    const isWorkerBooked = async ( req: Request, res: Response ) =>{
        try {
            const { userId, workerId } = req.params;
            const result = await isBooked(userId, workerId, dbBookingRepository);
            if (result instanceof AppError) {
                res.status(result.errorCode).json({
                    ...result
                });
            } else {
                res.json(result);
            }
        } catch {
            res.status(500);
        }
    }

    const complaintWorker = async ( req: Request, res: Response ) =>{
        try {
            const complaintDetails = req.body;
            const result = await addComplaint(complaintDetails,dbComplaintRepository)
            if (result instanceof AppError) {
                res.status(result.errorCode).json({
                    ...result
                });
            } else {
                res.json(result);
            }
        } catch {
            res.status(500);
        }
    }

    return {
        getAllWorkers,
        getAllServices,
        getWorkerById,
        getReviewByWorkerId,
        getBookingByUser,
        getBookingByWorker,
        getWalletByUser,
        bookingWorker,
        reviewWorker,
        complaintWorker,
        cancelBooking,
        updateUserProfile,
        isWorkerBooked,

    };
};

export default userController;