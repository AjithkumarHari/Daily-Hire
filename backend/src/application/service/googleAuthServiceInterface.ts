import { GoogleAuthService } from "../../framework/service/googleAuthService";

export const googleAuthServiceInterface = (service: ReturnType<GoogleAuthService>) => {
    
    const verify = async(token: string) => {

        return await service.verify(token)}
    
    return{
        verify
    }
}

export type GoogleAuthServiceInterface = typeof googleAuthServiceInterface;