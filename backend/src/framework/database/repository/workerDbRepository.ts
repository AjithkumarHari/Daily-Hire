import WORKER from "../models/workerModel";
import { Worker } from "../../../types/Worker";

export const workerRepositoryMongoDB = () => {

    const getAllWorkers = async():Promise<Worker[] | null> => {
        return await WORKER.find({isActive:true}).select('-password');
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

    const workerActivate =async (email: string) => {
        return await WORKER.updateOne({email}, {$set:{isActive: true}});
    }

    const blockDate = async (_id: string, date: Date) => {
        return await WORKER.updateOne({ _id },{ $addToSet: { blockedDates: date } });
    }

    const unBlockDate = async (_id: string, date: Date) => {
        return await WORKER.updateOne({ _id },{ $pull: { blockedDates: date } });
    }

    const updateWorker =async (_id:string, worker: Worker) => {
        return await WORKER.updateOne({_id},{...worker});
    }

    return {
        getAllWorkers,
        getWorkerByEmail,
        addWorker,
        getWorkerById,
        workerListUnlist,
        workerActivate,
        blockDate,
        unBlockDate,
        updateWorker,
    }
}

export type WorkerRepositoryMongoDB = typeof workerRepositoryMongoDB;