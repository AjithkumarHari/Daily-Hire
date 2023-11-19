import { Request , Response} from "express";
// import { UserDbInterface } from "../../application/repository/userDbRepository";
// import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { ServiceRepository } from "../../application/repository/serviceDbRepository";
import { ServiceDbRepositoryMongoDB } from "../../framework/database/repository/serviceDbRepository.";
import { allWorkers } from "../../application/useCase/user/allWorkers";
import { HttpStatus } from "../../types/HttpStatus";
import { findById } from "../../application/useCase/worker/findById";
import { Worker } from "../../types/Worker";
import { allServices } from "../../application/useCase/service/allService";


const userController = ( 
    // userDbRepository : UserDbInterface,
    // userDbRepositoryImp : UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    serviceDbRepository: ServiceRepository,
    serviceDbRepositoryImp: ServiceDbRepositoryMongoDB
    ) => {
        
    // const DbRepositoryUser = userDbRepository(userDbRepositoryImp())

    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());
    const dbServiceRepository = serviceDbRepository(serviceDbRepositoryImp());

    const getAllWorkers = async ( req: Request, res: Response ) => {

        try{
            const result: Worker[] | null | unknown= await allWorkers(dbWorkerRepository);
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

    

    return {
        getAllWorkers,
        getWorkerById,
        getAllServices
    };
};

export default userController;

