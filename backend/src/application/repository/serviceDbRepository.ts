import { ServiceDbRepositoryMongoDB } from "../../framework/database/repository/serviceDbRepository.";
import { Service } from "../../types/Service";

export const serviceDbRepository = (repository: ReturnType<ServiceDbRepositoryMongoDB>) => {

    const getAllServices = async () =>  await repository.getAllService();

    const getServiceById = async (serviceId: string) => await repository.getServiceById(serviceId);

    const getServiceByName = async (serviceName: string) => await repository.getServiceByName(serviceName);

    const addService = async (service: Service) => await repository.addService(service);

    const editService = async (service: Service) => await repository.editService(service);

    const serviceListUnlist = async (serviceId: string, newStatus: boolean) => await repository.listUnlistService(serviceId, newStatus);

    return {
        getAllServices,
        getServiceById,
        getServiceByName,
        addService,
        editService,
        serviceListUnlist,
    }
}

export type ServiceRepository = typeof serviceDbRepository;