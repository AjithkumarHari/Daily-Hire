import { Booking } from "../../../types/Booking";
import BOOKING from "../models/bookingModel";

export const bookingDbRepositoryMongoDB = () => {

    const getAllBooking = async () => {
        
    }

    const addBooking = async (bookingData: Booking) => {
        return BOOKING.create(bookingData)
    }

    return {
        getAllBooking,
        addBooking
    }
}

export type BookingDbRepositoryMongoDB = typeof bookingDbRepositoryMongoDB;