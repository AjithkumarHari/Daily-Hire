import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { Worker } from "../../types/Worker";

export const workerDbRepository = (repository: ReturnType<WorkerRepositoryMongoDB>) => {

    const getAllWorkers = async () => await repository.getAllWorkers();

    const getWorkerByEmail = async (email: string) => await repository.getWorkerByEmail(email);

    const addWorker = async (worker: Worker) => await repository.addWorker(worker);

    const getWorkerById = async (workerId: string) => await repository.getWorkerById(workerId);

    return {
        getAllWorkers,
        getWorkerByEmail,
        addWorker,
        getWorkerById
    }
}

export type WorkerRepository = typeof workerDbRepository;