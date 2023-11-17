import { Service } from "../../../types/Service";
import SERVICE from "../models/serviceModel";

export const serviceDbRepositoryMongoDB = () => {

    const getAllService = async () => {
        return await SERVICE.find( );
    }

    const getServiceById = async (id: string) => {
        console.log('id 2');
        
        const ret = await SERVICE.findById(id);
        console.log(ret);
        return ret;
        
    }

    const getServiceByName =async (name: string) => {
        return await SERVICE.findOne({name});
    } 

    const addService = async (service: Service) => {
        return await SERVICE.create(service);
    }

    const listUnlistService = async (_id: string, newStatus: boolean) => {
        return await SERVICE.updateOne({_id},{$set:{isListed: newStatus}});
    }

    return {
        getAllService,
        getServiceById,
        getServiceByName,
        addService,
        listUnlistService,
    }
}

export type ServiceDbRepositoryMongoDB = typeof serviceDbRepositoryMongoDB;