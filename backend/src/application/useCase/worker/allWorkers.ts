import { HttpStatus } from "../../../types/HttpStatus";
import { Worker } from "../../../types/Worker";
import AppError from "../../../util/appError";
import { WorkerRepository } from "../../repository/workerDbRepository";

export const allWorkers = async (workerRepository: ReturnType<WorkerRepository>) => {
    try {
        const workers: Worker[] | null = await workerRepository.getAllWorkers();

        if(!workers)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);

        return workers;
    } catch (AppError) {
        return AppError;
    }
}

export const allListedWorkers = async (workerRepository: ReturnType<WorkerRepository>) => {
    try {
        const workers: Worker[] | null = await workerRepository.getAllWorkers();

        if(!workers)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);

        return workers.filter((w)=> w.isListed == true);
    } catch (AppError) {
        return AppError;
    }
}