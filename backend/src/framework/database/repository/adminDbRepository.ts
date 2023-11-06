import { Admin } from "../../../types/Admin";
import ADMIN from "../models/adminModel";

export const adminDbRepositoryMongoDB = () => {

    const getAdminByEmail = async (email: string) : Promise<Admin | null> => {
        return await ADMIN.findOne( {email} );
    }

    return {
        getAdminByEmail
    }
}

export type AdminDbRepositoryMongoDb = typeof adminDbRepositoryMongoDB;