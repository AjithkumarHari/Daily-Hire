import { PaymentService } from "../../framework/service/paymentService";
import { Worker } from "../../types/Worker";

export const paymentServiceInterface = (service: ReturnType<PaymentService>) => {

    const createSession = async (paymentDetails:  {user: object, worker: Worker, bookingTime: Date} ) => service.createSession(paymentDetails);

    return {
        createSession,
    };
}

export type PaymentServiceInterface = typeof paymentServiceInterface;