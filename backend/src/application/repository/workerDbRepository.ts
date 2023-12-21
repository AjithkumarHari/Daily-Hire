import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";
import { Worker } from "../../types/Worker";

export const workerDbRepository = (repository: ReturnType<WorkerRepositoryMongoDB>) => {

    const getAllWorkers = async () => await repository.getAllWorkers();

    const getWorkerByEmail = async (email: string) => await repository.getWorkerByEmail(email);

    const addWorker = async (worker: Worker) => await repository.addWorker(worker);

    const getWorkerById = async (workerId: string) => await repository.getWorkerById(workerId);

    const workerListUnlist = async (workerId: string, newStatus: boolean) => await repository.workerListUnlist(workerId, newStatus);

    const workerActivate = async (email: string) => await repository.workerActivate(email);

    const blockDate = async (workerId: string, blockDate: Date) => await repository.blockDate(workerId, blockDate);
    
    const unBlockDate = async (workerId: string, blockDate: Date) => await repository.unBlockDate(workerId, blockDate);

    const updateWorker = async (workerId: string, worker: Worker) => await repository.updateWorker(workerId, worker);

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

export type WorkerRepository = typeof workerDbRepository;