import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { BookingRepository } from "../../repository/bookingDbRepository";

export const findByUser = async ( userId:string, bookingRepository: ReturnType<BookingRepository>) => {
    try {
      
        const bookings = await bookingRepository.getBookingByUserId(userId);

        if(!bookings)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);

        return bookings;

   } catch (AppError) {
      return AppError;
  }
 
}