import { AdminDbRepositoryMongoDb } from "../../framework/database/repository/adminDbRepository";

export const adminDbRepository = (repository: ReturnType<AdminDbRepositoryMongoDb>) =>{

    const getAdminByEmail = async (email: string) => await repository.getAdminByEmail(email);

    return {
        getAdminByEmail
    }

}

export type AdminRepository = typeof adminDbRepository; 