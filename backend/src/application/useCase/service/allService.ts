import { ServiceRepository } from "../../repository/serviceDbRepository";

export const allServices =async ( dbRepositoryService:ReturnType<ServiceRepository>) => {
   
   return await dbRepositoryService.getAllServices()
 
}