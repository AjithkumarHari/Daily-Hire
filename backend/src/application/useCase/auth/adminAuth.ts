import { Admin } from "../../../types/Admin";
import { AdminRepository } from "../../repository/adminDbRepository";
import { AuthService } from "../../../framework/service/authService";
import AppError from "../../../util/appError";
import { HttpStatus } from "../../../types/HttpStatus";

export const adminLogin = async (
    email: string,
    password: string,
    adminRepository: ReturnType<AdminRepository>,
    authService: ReturnType<AuthService>
) => {

    try {

        const admin: Admin |null = await adminRepository.getAdminByEmail(email);
        if(!admin){
            throw new AppError("Incorrect Email", HttpStatus.UNAUTHORIZED);
        }
        const isPasswordCorrect = await authService.comparePassword(password, admin.password);
       
        if(!isPasswordCorrect){
            throw new AppError("Password does not match", HttpStatus.UNAUTHORIZED);
        }
        return authService.generateToken(admin._id);

    } catch (AppError) {
        return AppError;
    }
}