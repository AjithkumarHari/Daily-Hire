import { Request , Response} from "express";

import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { ServiceRepository } from "../../application/repository/serviceDbRepository";
import { ServiceDbRepositoryMongoDB } from "../../framework/database/repository/serviceDbRepository.";
import { allWorkers } from "../../application/useCase/user/allWorkers";
import { allUsers } from "../../application/useCase/admin/allUser";
import { HttpStatus } from "../../types/HttpStatus";
import { listUnlistUser } from "../../application/useCase/admin/listUnlistUser";
import { listUnlistWorker } from "../../application/useCase/admin/listUnlistWorker";
import { addNewService } from "../../application/useCase/service/addService";
import { listUnlistService } from "../../application/useCase/admin/listUnlistService";
import { allServices } from "../../application/useCase/service/allService";
import { findById } from "../../application/useCase/service/findServiceById";


const adminController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    serviceDbRepository: ServiceRepository,
    serviceDbRepositoryImp: ServiceDbRepositoryMongoDB
) => {

    const dbUserRepository = userDbRepository(userDbRepositoryImp());
    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());
    const dbServiceRepository = serviceDbRepository(serviceDbRepositoryImp());

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
            console.log('getServicesById',req.params.id);
            
            const serviceId: string = req.params.id
            const result = await findById(serviceId, dbServiceRepository)
            console.log('result',result);
            
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
            const service = req.body
            console.log("createService",service);
            
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


    return {
        getAllUser,
        getAllWorkers,
        getAllServices,
        userStatusChange,
        workerStatusChange,
        serviceStatusChange,
        createService,
        getServicesById,
    }
}
export default adminController