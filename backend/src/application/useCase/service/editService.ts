import { ServiceRepository } from "../../repository/serviceDbRepository";
import { Service } from "../../../types/Service";
import AppError from "../../../util/appError";
import { HttpStatus } from "../../../types/HttpStatus";

export const editService = async (
    service: Service,
    dbRepositoryService: ReturnType<ServiceRepository>
) => {
    try {
        service.name = service.name.toUpperCase();
        if(service._id){
            const isServiceExist = await dbRepositoryService.getServiceById(service._id);
            
            if(!isServiceExist)
                throw new AppError("Service not exits",HttpStatus.UNAUTHORIZED);
            await dbRepositoryService.editService(service); 
            return {status: "success",message: `service is updated done`}
        }
    } catch (AppError) {
        return AppError;
    }
}