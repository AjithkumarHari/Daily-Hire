import { ServiceRepository } from "../../repository/serviceDbRepository";

export const allServices =async ( dbRepositoryService:ReturnType<ServiceRepository>) => {
   
   return await dbRepositoryService.getAllServices()
 
}

export const allListedServices =async ( dbRepositoryService:ReturnType<ServiceRepository>) => {
   
   const result = await dbRepositoryService.getAllServices()
   return result.filter((s)=> s.isListed==true)
 
}