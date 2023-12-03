import { Worker } from "../../../types/Worker";
import { WorkerRepository } from "../../repository/workerDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";
import { OtpServiceInterface } from "../../service/otpServiceInterface";
import AppError from "../../../util/appError";
import { HttpStatus } from "../../../types/HttpStatus";

export const workerSignup = async (
    worker : Worker,
    workerRepository: ReturnType<WorkerRepository>,
    authService: ReturnType<AuthServiceInterface>,
    otpService: ReturnType<OtpServiceInterface>
) => {
    try {
        worker.email = worker.email.toLowerCase();
        const isWorkerExist = await workerRepository.getWorkerByEmail(worker.email);
        if(isWorkerExist){
            throw new AppError("worker already exists", HttpStatus.UNAUTHORIZED);
        } 
        worker.password = await authService.encryptPassword(worker.password);
        await workerRepository.addWorker(worker);
        await otpService.sendOtp(worker.phone);
        const { name, email, phone } = worker;
        return {"status": "success", workerData:{name, email, phone}};
    } catch (AppError) {
        return AppError;
    }
}

export const workerLogin = async (
    email: string,
    password: string,
    workerRepository: ReturnType<WorkerRepository>,
    authService: ReturnType<AuthServiceInterface>,
    otpService: ReturnType<OtpServiceInterface>
) => {
    try {
        const worker: Worker | null = await workerRepository.getWorkerByEmail(email);

        if(!worker) 
            throw new AppError("Worker not exists",HttpStatus.UNAUTHORIZED);

        const isPasswordCorrect = await authService.comparePassword(password, worker.password);

        if(!isPasswordCorrect)
            throw new AppError("Password does not match", HttpStatus.UNAUTHORIZED);

        if(!worker.isActive){ 
            await otpService.sendOtp(worker.phone);
            const { name, email, phone } = worker;
            return {"status": "pending", workerData:{name, email, phone}};
        }
        if(worker._id){
            const token = authService.generateToken(worker._id.toString());
            return {token, workerDate: worker}
        }
    } catch (AppError) {
        return AppError;
    }
}

export const workerOtpVerification = async (
    data:{
        email: string,
        phoneNumber: number,
        code: string
    },
    workerRepository: ReturnType<WorkerRepository>,
    authService: ReturnType<AuthServiceInterface>,
    otpService: ReturnType<OtpServiceInterface>,
) => {
    try{
        const isOtpVaild = await otpService.verifyOtp(data.phoneNumber, data.code);
        if(isOtpVaild){
            await workerRepository.workerActivate(data.email);
            const worker = await workerRepository.getWorkerByEmail(data.email);
            if(worker?._id){
                const token = authService.generateToken(worker._id)
                return {"status":"success" ,token , workerData:worker};
            }
        }else{
            throw new AppError("OTP does not match",HttpStatus.UNAUTHORIZED);
        }

    } catch(AppError) {
        return AppError;
    }
    
}