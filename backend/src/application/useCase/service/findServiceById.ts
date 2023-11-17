import { ServiceRepository } from "../../repository/serviceDbRepository";

export const findById = async (serviceId:string,dbRepositoryService:ReturnType<ServiceRepository>) => {
   
   console.log('id 1');
   
   return await dbRepositoryService.getServiceById(serviceId)
 
}