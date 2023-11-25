import { Service } from "../../../types/Service";
import SERVICE from "../models/serviceModel";

export const serviceDbRepositoryMongoDB = () => {

    const getAllService = async () => {
        return await SERVICE.find( );
    }

    const getServiceById = async (id: string) => {
        return await SERVICE.findById(id);
    }

    const getServiceByName =async (name: string) => {
        return await SERVICE.findOne({name});
    } 

    const addService = async (service: Service) => {
        return await SERVICE.create(service);
    }

    const editService = async (service: Service) => {  
        return await SERVICE.updateOne({_id: service._id},{$set:{name: service.name, description: service.description}});
    }

    const listUnlistService = async (_id: string, newStatus: boolean) => {
        return await SERVICE.updateOne({_id},{$set:{isListed: newStatus}});
    }

    return {
        getAllService,
        getServiceById,
        getServiceByName,
        addService,
        editService,
        listUnlistService,
    }
}

export type ServiceDbRepositoryMongoDB = typeof serviceDbRepositoryMongoDB;