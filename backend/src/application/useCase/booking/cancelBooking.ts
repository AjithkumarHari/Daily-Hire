import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { BookingRepository } from "../../repository/bookingDbRepository"; 

export const cancelBooking = async (bookingId: string,  bookingRepository: ReturnType<BookingRepository>) => {
    try {
        const result: any = await bookingRepository.bookingCancel(bookingId);
        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        return {status: "success", message:"worker status change success"};
       
    } catch (AppError) {
        return AppError;
    }
}