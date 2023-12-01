import { BookingDbRepositoryMongoDB } from "../../framework/database/repository/bookingDbRepository";
import { Booking } from "../../types/Booking";

export const bookingDbRepository = (repository: ReturnType<BookingDbRepositoryMongoDB>) => {

    const addBooking = async (bookingData: Booking) => await repository.addBooking(bookingData);

    const getAllBooking = async () => await repository.getAllBooking();

    const getBookingByUserEmail = async (email: string) => await repository.getBookingByUserEmail(email);

    const bookingCancel = async (id: string) => await repository.bookingCancel(id);
    
    const cancelRequest = async (id: string) => await repository.cancelRequest(id);

    const getBookingByWorkerId = async (_id: string) => await repository.getBookingByWorkerId(_id);

    return {
        addBooking,
        getAllBooking,
        getBookingByUserEmail,
        bookingCancel,
        cancelRequest,
        getBookingByWorkerId,
    }
}

export type BookingRepository = typeof bookingDbRepository;