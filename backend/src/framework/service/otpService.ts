import { Twilio } from "twilio";
import configKeys from "../../config";

const accountSid = configKeys.TWILIO_ACCOUNT_SID
const serviceSid = configKeys.TWILIO_SERVICE_SID
const authToken =  configKeys.TWILIO_AUTH_TOKEN

const client = new Twilio(accountSid, authToken);

export const otpService = () => {

    const sendOtp = async (phoneNumber: number) => {
        try {
            console.log('send otp to',phoneNumber);
            
            await client.verify.v2.services(serviceSid).verifications.create({
                to: `+91${phoneNumber}`,
                channel: `sms`,
            })
        } catch (error) {
            console.error(error);
            throw new Error('Failed to send verification code');
        }
    }

    const verifyOtp = async (phoneNumber: number, code: string) => {
        try {
            const verification = await client.verify.v2.services(serviceSid).verificationChecks.create({
                to: `+91${phoneNumber}`,
                code: code
            })
            if (verification.status === 'approved')
                return true;
            else
                return false;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to verify code");
        }
    }

    return {
        sendOtp,
        verifyOtp
    }
}

export type OtpService = typeof otpService;