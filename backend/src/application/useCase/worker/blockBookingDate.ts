import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { WorkerRepository } from "../../repository/workerDbRepository";

export const blockBookingDate = async (workerId: string, blockDate: Date,  workerRepository: ReturnType<WorkerRepository>) => {
    try {
        const result: any = await workerRepository.blockDate(workerId,blockDate);
        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        return {status: "success", message:"worker status change success"};
       
    } catch (AppError) {
        return AppError;
    }
}