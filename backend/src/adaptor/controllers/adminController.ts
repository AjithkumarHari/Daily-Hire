import { Request , Response} from "express";

import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { ServiceRepository } from "../../application/repository/serviceDbRepository";
import { ServiceDbRepositoryMongoDB } from "../../framework/database/repository/serviceDbRepository.";
import { ReviewRepository } from "../../application/repository/reviewDbRepository";
import { ReviewDbRepositoryMongoDB } from "../../framework/database/repository/reviewDbrepository";
import { allWorkers } from "../../application/useCase/worker/allWorkers";
import { allUsers } from "../../application/useCase/admin/allUser";
import { HttpStatus } from "../../types/HttpStatus";
import { listUnlistUser } from "../../application/useCase/admin/listUnlistUser";
import { listUnlistWorker } from "../../application/useCase/admin/listUnlistWorker";
import { addNewService } from "../../application/useCase/service/addService";
import { listUnlistService } from "../../application/useCase/admin/listUnlistService";
import { allServices } from "../../application/useCase/service/allService";
import { findById } from "../../application/useCase/service/findServiceById";
import { editService } from "../../application/useCase/service/editService";
import { findAllReviews } from "../../application/useCase/review/findAllreviews";


const adminController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    serviceDbRepository: ServiceRepository,
    serviceDbRepositoryImp: ServiceDbRepositoryMongoDB,
    reviewDbRepository: ReviewRepository,
    reviewDbRepositoryImp: ReviewDbRepositoryMongoDB,
) => {

    const dbUserRepository = userDbRepository(userDbRepositoryImp());
    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());
    const dbServiceRepository = serviceDbRepository(serviceDbRepositoryImp());
    const dbReviewRepository = reviewDbRepository(reviewDbRepositoryImp());

    const getAllUser = async ( req: Request, res: Response ) => {
        try {
            const result = await allUsers(dbUserRepository)
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

    const userStatusChange = async ( req: Request, res: Response ) => {
        try {
            const userId = req.body.userId
            const result = await listUnlistUser(userId,dbUserRepository)
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

    const workerStatusChange = async ( req: Request, res: Response ) => {
        try {
            const workerId = req.body.workerId
            const result = await listUnlistWorker(workerId,dbWorkerRepository)
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

    const getAllWorkers = async ( req: Request, res: Response ) => {
        try {
            const result = await allWorkers(dbWorkerRepository)
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

    const getServicesById = async ( req: Request, res: Response ) => {
        try {
            const serviceId: string = req.params.id
            const result = await findById(serviceId, dbServiceRepository)
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

    const createService = async ( req: Request, res: Response) => {
        try {
            console.log('createService');
            
            const service = req.body;
            const result = await addNewService(service, dbServiceRepository )
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch (error) {
            res.status(500)
        }
    }

    const updateService = async ( req: Request, res: Response) => {
        try {
            const service = req.body 
            console.log('updateService',service);
            
            const result = await editService(service, dbServiceRepository )
            if(JSON.stringify(result)=='{}'){
                res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Not Found'
                })
            }
            res.json(result)
        } catch (error) {
            res.status(500)
        }
    }

    const serviceStatusChange = async ( req: Request, res: Response ) => {
        try {
            const serviceId = req.body.serviceId
            const result = await listUnlistService(serviceId, dbServiceRepository)
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

    const getAllReviews = async ( req: Request, res: Response ) => {
        try{
            const result = await findAllReviews(dbReviewRepository);
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


    return {
        getAllUser,
        getAllWorkers,
        getAllServices,
        userStatusChange,
        workerStatusChange,
        serviceStatusChange,
        createService,
        updateService,
        getServicesById,
        getAllReviews,
    }
}
export default adminController