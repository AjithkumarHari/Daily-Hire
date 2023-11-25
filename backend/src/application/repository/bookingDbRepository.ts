import { BookingDbRepositoryMongoDB } from "../../framework/database/repository/bookingDbRepository";
import { Booking } from "../../types/Booking";

export const bookingDbRepository = (repository: ReturnType<BookingDbRepositoryMongoDB>) => {

    const addBooking = async (bookingData: Booking) => await repository.addBooking(bookingData);

    return {
        addBooking,
    }
}

export type BookingRepository = typeof bookingDbRepository;