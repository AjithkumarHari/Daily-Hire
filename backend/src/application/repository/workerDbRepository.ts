import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { Worker } from "../../types/Worker";

export const workerDbRepository = (repository: ReturnType<WorkerRepositoryMongoDB>) => {

    const getWorkerByEmail = async (email: string) => await repository.getWorkerByEmail(email);

    const addWorker = async (worker: Worker) => await repository.addWorker(worker); 

    return {
        getWorkerByEmail,
        addWorker
    }
}

export type WorkerRepository = typeof workerDbRepository;