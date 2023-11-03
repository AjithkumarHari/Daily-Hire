import WORKER from "../models/workerModel";
import { Worker } from "../../../types/Worker";

export const workerRepositoryMongoDB = () => {

    const getAllWorkers = async():Promise<Worker[] | null> => {
        return await WORKER.find( ).select('-password');
    }

    const getWorkerByEmail = async(email: string):Promise<Worker | null> => {
        return await WORKER.findOne( {email} );
    }

    const addWorker =async (worker: Worker) => {
        return await WORKER.create(worker);
    }

    return {
        getAllWorkers,
        getWorkerByEmail,
        addWorker
    }
}

export type WorkerRepositoryMongoDB = typeof workerRepositoryMongoDB;