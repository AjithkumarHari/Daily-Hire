import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { ServiceRepository } from "../../repository/serviceDbRepository";

export const listUnlistService = async (serviceId:string, serviceRepository: ReturnType<ServiceRepository>) => {
    try {
        const service = await serviceRepository.getServiceById(serviceId)
        if(service){
            const result: any = await serviceRepository.serviceListUnlist(serviceId, !service.isListed)
            if(!result)
                throw new AppError("Not Found", HttpStatus.NOT_FOUND);
            return {status: "success", message:"service status change success"};
        }
        throw new AppError("Service Not Found", HttpStatus.NOT_FOUND);
    } catch (AppError) {
        return AppError;
    }
}
