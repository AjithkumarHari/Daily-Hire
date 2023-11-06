import { HttpStatus } from "../../../types/HttpStatus";
import { Worker } from "../../../types/Worker";
import AppError from "../../../util/appError";
import { WorkerRepository } from "../../repository/workerDbRepository";

export const findById = async ( workerId:string, dbWorkerRepository:ReturnType<WorkerRepository>) => {
    try {
      
        const worker: Worker | null = await dbWorkerRepository.getWorkerById(workerId);

        if(!worker)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);

        return worker;

   } catch (AppError) {
      return AppError;
  }
 
}