import { Request , Response} from "express";
// import { UserDbInterface } from "../../application/repository/userDbRepository";
// import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { allWorkers } from "../../application/useCase/user/allWorkers";
import { HttpStatus } from "../../types/HttpStatus";
import { findById } from "../../application/useCase/worker/findById";
import { Worker } from "../../types/Worker";


const userController = ( 
    // userDbRepository : UserDbInterface,
    // userDbRepositoryImp : UserRepositoryMongoDB,
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
    ) => {
        
    // const DbRepositoryUser = userDbRepository(userDbRepositoryImp())

    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());

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

    

    return {
        getAllWorkers,
        getWorkerById
    };
};

export default userController;

