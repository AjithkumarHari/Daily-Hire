import WORKER from "../models/workerModel";
import { Worker } from "../../../types/Worker";

export const workerRepositoryMongoDB = () => {

    const getAllWorkers = async():Promise<Worker[] | null> => {
        return await WORKER.find().select('-password');
    }

    const getWorkerByEmail = async(email: string):Promise<Worker | null> => {
        return await WORKER.findOne({email});
    }

    const addWorker =async (worker: Worker) => {
        return await WORKER.create(worker);
    }

    const getWorkerById = async(workerId: string):Promise<Worker | null> => {
        const result: Worker = await WORKER.findById(workerId).select('-password');
        result ? result._id = result._id.toString() : null;
        return result;
    }

    return {
        getAllWorkers,
        getWorkerByEmail,
        addWorker,
        getWorkerById
    }
}

export type WorkerRepositoryMongoDB = typeof workerRepositoryMongoDB;