import { Request , Response} from "express";

import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { allWorkers } from "../../application/useCase/user/allWorkers";
import { allUsers } from "../../application/useCase/admin/allUser";
import { HttpStatus } from "../../types/HttpStatus";
import { listUnlistUser } from "../../application/useCase/admin/listUnlistUser";
import { listUnlistWorker } from "../../application/useCase/admin/listUnlistWorker";


const adminController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
) => {

    const dbUserRepository = userDbRepository(userDbRepositoryImp());
    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());

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
    return {
        getAllUser,
        getAllWorkers,
        userStatusChange,
        workerStatusChange
    }
}
export default adminController