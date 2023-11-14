import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import {  WorkerRepository } from "../../repository/workerDbRepository";

export const listUnlistWorker = async (workerId:string, workerRepository: ReturnType<WorkerRepository>) => {
    try {
        const worker = await workerRepository.getWorkerById(workerId)
        if(worker){
            const result: any = await workerRepository.workerListUnlist(workerId, !worker.isListed)
            if(!result)
                throw new AppError("Not Found", HttpStatus.NOT_FOUND);
            return {status: "success", message:"user status change success"};
        }
        throw new AppError("User Not Found", HttpStatus.NOT_FOUND);
    } catch (AppError) {
        return AppError;
    }
}