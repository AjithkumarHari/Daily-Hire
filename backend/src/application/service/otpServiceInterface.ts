import { OtpService } from "../../framework/service/otpService";

export const otpServiceInterface = (service: ReturnType<OtpService>) => {

    const sendOtp = async (phoneNumber: number) => service.sendOtp(phoneNumber);

    const verifyOtp = async (phoneNumber: number, code: string) => service.verifyOtp(phoneNumber, code);

    return {
        sendOtp,
        verifyOtp
    };
}

export type OtpServiceInterface = typeof otpServiceInterface;