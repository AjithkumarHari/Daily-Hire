import { HttpStatus } from "../../../types/HttpStatus";
import { Booking } from "../../../types/Booking";
import AppError from "../../../util/appError";
import { BookingRepository } from "../../repository/bookingDbRepository";

export const findBookingById = async ( BookingId:string, bookingRepository:ReturnType<BookingRepository>) => {
    try {
        const booking: Booking | null = await bookingRepository.getBookingById(BookingId);
        if(!booking)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        return booking;
    } catch (AppError) {
        return AppError;
    }
}