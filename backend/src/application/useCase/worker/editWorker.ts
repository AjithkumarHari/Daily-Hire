import { HttpStatus } from "../../../types/HttpStatus";
import { Worker } from "../../../types/Worker";
import AppError from "../../../util/appError";
import { WorkerRepository } from "../../repository/workerDbRepository";

import { AuthServiceInterface } from "../../service/authServiceInterface";

export const editWorker = async (
    workerId: string,
    worker: Worker,
    workerRepository:ReturnType<WorkerRepository>,
    // authService: ReturnType<AuthServiceInterface>,
) => {
    try {
        const isWorkerExist = await workerRepository.getWorkerById(workerId);
        if(!isWorkerExist){
            throw new AppError("Worker not exits",HttpStatus.UNAUTHORIZED);
        }else{
            // if(worker.password)
            //     worker.password = await authService.encryptPassword(worker.password);
            await workerRepository.updateWorker(workerId,worker);
            const newWorkerData = await workerRepository.getWorkerById(workerId);
            if(newWorkerData){

                return {status: "success",message: `worker data is updated`, workerData:  newWorkerData };
            }
        }
    } catch (AppError) {
        return AppError;
    }
    
}