import { Request, Response } from "express";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { ServiceRepository } from "../../application/repository/serviceDbRepository";
import { ServiceDbRepositoryMongoDB } from "../../framework/database/repository/serviceDbRepository.";
import { BookingRepository } from "../../application/repository/bookingDbRepository";
import { BookingDbRepositoryMongoDB } from "../../framework/database/repository/bookingDbRepository";
// import { WalletRepository } from "../../application/repository/walletDbRepository";
// import { WalletDbRepositoryMongoDB } from "../../framework/database/repository/walletDbRepository";
import { allServices } from "../../application/useCase/service/allService";
import { HttpStatus } from "../../types/HttpStatus";
import { Booking } from "../../types/Booking";
import { findByWorkerId } from "../../application/useCase/booking/findByWorkerId";
import { cancelBookingRequest } from "../../application/useCase/booking/cancelBookingRequest";
import { blockBookingDate, unBlockBookingDate } from "../../application/useCase/worker/blockUnblockBooking";
import { getStaticsWorker } from "../../application/useCase/worker/getStaticsWorker";
import AppError from "../../util/appError";
import { editWorker } from "../../application/useCase/worker/editWorker";

const workerController = (
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    serviceDbRepository: ServiceRepository,
    serviceDbRepositoryImp: ServiceDbRepositoryMongoDB,
    bookingDbRepository: BookingRepository,
    bookingDbRepositoryImp: BookingDbRepositoryMongoDB,
    // walletDbRepository: WalletRepository,
    // walletDbRepositoryImp: WalletDbRepositoryMongoDB,
    
) => {
    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());
    const dbServiceRepository = serviceDbRepository(serviceDbRepositoryImp());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImp());
    // const dbWalletRepository = walletDbRepository(walletDbRepositoryImp());

    const getAllServices = async ( req: Request, res: Response ) => {
        try {
            const result = await allServices(dbServiceRepository)
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

    const blockBooking = async ( req: Request, res: Response) => {
        try {
            console.log('hsghfhjksd');
            
            const {workerId, blockDate} = req.body;
            console.log('blockBooking',workerId, blockDate);
           
           const result = await blockBookingDate(workerId, blockDate, dbWorkerRepository)
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)

        } catch {
            
        }
    }

    const unBlockBooking = async ( req: Request, res: Response) => {
        try {
            console.log('hsghfhjksd');
            
            const {workerId, blockDate} = req.body;
            console.log('blockBooking',workerId, blockDate);
           
           const result = await unBlockBookingDate(workerId, blockDate, dbWorkerRepository)
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)

        } catch {
            
        }
    }

    const getStatistics = async ( req: Request, res: Response ) => {
        try {
            const workerId = req.params.id;
            const result = await getStaticsWorker(workerId ,dbBookingRepository)
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

    const updateWorkerProfile = async ( req: Request, res: Response ) => {
        try {
            const { workerId, worker } = req.body;
            const result = await editWorker(workerId, worker, dbWorkerRepository);
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
        getAllServices,
        getBookingByWorker,
        getStatistics,
        cancelBooking,
        blockBooking,
        unBlockBooking,
        updateWorkerProfile,
    };
    
}

export default workerController;