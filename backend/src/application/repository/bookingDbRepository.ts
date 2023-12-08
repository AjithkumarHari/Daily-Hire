import { BookingDbRepositoryMongoDB } from "../../framework/database/repository/bookingDbRepository";
import { Booking } from "../../types/Booking";

export const bookingDbRepository = (repository: ReturnType<BookingDbRepositoryMongoDB>) => {

    const addBooking = async (bookingData: Booking) => await repository.addBooking(bookingData);

    const getAllBooking = async () => await repository.getAllBooking();

    const getBookingByUserId = async (userId: string) => await repository.getBookingByUserId(userId);

    const bookingCancel = async (id: string) => await repository.bookingCancel(id);
    
    const cancelRequest = async (id: string) => await repository.cancelRequest(id);

    const getBookingByWorkerId = async (_id: string) => await repository.getBookingByWorkerId(_id);

    const getBookingById = async (id: string) => await repository.getBookingById(id);
    
    const isBooked = async (userId: string, workerId: string) => await repository.isBooked(userId, workerId);

    return {
        addBooking,
        getAllBooking,
        getBookingByUserId,
        bookingCancel,
        cancelRequest,
        getBookingByWorkerId,
        getBookingById,
        isBooked,
    }
}

export type BookingRepository = typeof bookingDbRepository;