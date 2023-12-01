import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { BookingRepository } from "../../repository/bookingDbRepository"; 

export const cancelBookingRequest = async (bookingId: string,  bookingRepository: ReturnType<BookingRepository>) => {
    try {
        const result: any = await bookingRepository.cancelRequest(bookingId);
        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        return {status: "success", message:"booking cancel request success"};
       
    } catch (AppError) {
        return AppError;
    }
}