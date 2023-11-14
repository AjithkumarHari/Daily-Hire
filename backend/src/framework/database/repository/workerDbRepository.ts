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

    const workerListUnlist = async (_id: string, newStatus: boolean) => {
        return await WORKER.updateOne({_id}, {$set:{isListed: newStatus}});
    }

    return {
        getAllWorkers,
        getWorkerByEmail,
        addWorker,
        getWorkerById,
        workerListUnlist
    }
}

export type WorkerRepositoryMongoDB = typeof workerRepositoryMongoDB;