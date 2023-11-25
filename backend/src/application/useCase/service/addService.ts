import { ServiceRepository } from "../../repository/serviceDbRepository";
import { Service } from "../../../types/Service";
import AppError from "../../../util/appError";
import { HttpStatus } from "../../../types/HttpStatus";

export const addNewService = async (
    service: Service,
    dbRepositoryService: ReturnType<ServiceRepository>
) => {
    try {
        service.name = service.name.toUpperCase();
        const isServiceExist = await dbRepositoryService.getServiceByName(service.name);
        if(isServiceExist)
            throw new AppError("Service already exits",HttpStatus.UNAUTHORIZED);
        const result = await dbRepositoryService.addService(service);  
        return {status: "success",message: `${result.name} service is added`}
    } catch (AppError) {
        return AppError;
    }
}