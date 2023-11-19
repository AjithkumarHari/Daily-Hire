import { Worker } from "../../../types/Worker";
import { WorkerRepository } from "../../repository/workerDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";
import AppError from "../../../util/appError";
import { HttpStatus } from "../../../types/HttpStatus";

export const workerSignup = async (
    worker : Worker,
    workerRepository: ReturnType<WorkerRepository>,
    authService: ReturnType<AuthServiceInterface>
) => {
    try {
        worker.email = worker.email.toLowerCase();
        const isWorkerExist = await workerRepository.getWorkerByEmail(worker.email);
        if(isWorkerExist){
            throw new AppError("worker already exists", HttpStatus.UNAUTHORIZED);
        } 
        worker.password = await authService.encryptPassword(worker.password);
        await workerRepository.addWorker(worker);
        return {status: "success"};
    } catch (AppError) {
        return AppError;
    }
}

export const workerLogin = async (
    email: string,
    password: string,
    workerRepository: ReturnType<WorkerRepository>,
    authService: ReturnType<AuthServiceInterface>
) => {
    try {
        const worker: Worker | null = await workerRepository.getWorkerByEmail(email);

        if(!worker) 
            throw new AppError("Worker not exists",HttpStatus.UNAUTHORIZED);

        const isPasswordCorrect = await authService.comparePassword(password, worker.password);

        if(!isPasswordCorrect)
            throw new AppError("Password does not match", HttpStatus.UNAUTHORIZED);

        if(worker._id){
            const token = authService.generateToken(worker._id.toString());
            return {token, workerDate: worker}
        }
    } catch (AppError) {
        return AppError;
    }
}
