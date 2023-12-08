import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { WorkerRepository } from "../../repository/workerDbRepository";

export const blockBookingDate = async (workerId: string, blockDate: Date,  workerRepository: ReturnType<WorkerRepository>) => {
    try {
        const result: any = await workerRepository.blockDate(workerId,blockDate);
        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        const worker = await workerRepository.getWorkerById(workerId);
        return {status: "success", message:"worker booking block success", workerData: worker};
       
    } catch (AppError) {
        return AppError;
    }
}
export const unBlockBookingDate = async (workerId: string, blockDate: Date,  workerRepository: ReturnType<WorkerRepository>) => {
    try {
        const result: any = await workerRepository.unBlockDate(workerId,blockDate);
        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        const worker = await workerRepository.getWorkerById(workerId);
        return {status: "success", message:"worker booking unblock success",workerData: worker};
       
    } catch (AppError) {
        return AppError;
    }
}