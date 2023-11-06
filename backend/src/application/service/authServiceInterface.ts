import { AuthService } from "../../framework/service/authService";

export const authServiceInterface = (service: ReturnType<AuthService>) => {

    const encryptPassword = (password: string) => service.encryptPassword(password);

    const comparePassword = (password: string, hashedPassword: string) => 
        service.comparePassword(password, hashedPassword); 

    const generateToken = (payload: string) => service.generateToken(payload);

    const verifyToken = (token: string) => service.verifyToken(token);

    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    };
}

export type AuthServiceInterface = typeof authServiceInterface;