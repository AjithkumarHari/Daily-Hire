import { Booking } from "../../../types/Booking";
import { HttpStatus } from "../../../types/HttpStatus";
import { User } from "../../../types/User";
import { Worker } from "../../../types/Worker";
import AppError from "../../../util/appError";
import { PaymentServiceInterface } from "../../service/paymentServiceInterface";
import { BookingRepository } from "../../repository/bookingDbRepository";

export const bookingPayment = async (
    paymentDetails:  {user: User, worker: Worker, bookingTime: Date},
    paymentService: ReturnType<PaymentServiceInterface>,
    bookingRepository: ReturnType<BookingRepository>
    ) => {
    try {
        const session: any = await paymentService.createSession(paymentDetails)  
        console.log(session);
        
        if(!session)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        const bookingData: Booking = {
            ...paymentDetails,
            fee: paymentDetails.worker.wageForDay,
            paymentId: session.id,
            paymentStatus: 'paid',
            status:'Confirmed'
        }
        await bookingRepository.addBooking(bookingData);        
        return {"status":"succuss",sessionUrl: session.url};
    } catch (AppError) {
        return AppError;
    }
}