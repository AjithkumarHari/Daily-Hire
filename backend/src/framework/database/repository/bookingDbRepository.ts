import { Booking } from "../../../types/Booking";
import BOOKING from "../models/bookingModel";

export const bookingDbRepositoryMongoDB = () => {

    const getAllBooking = async () => {
        return BOOKING.find().sort({ bookingTime: -1 });
    }

    const addBooking = async (bookingData: Booking) => {
        return BOOKING.create(bookingData)
    }

    const getBookingByUserEmail = async (email: string) => {
        return BOOKING.find({"user.email": email}).sort({ bookingTime: -1 });
    }

    const bookingCancel = async (_id: string) => {
        return await BOOKING.updateOne({_id}, {$set:{isCancelled: true, status:"Cancelled"}});
    }
    
    const cancelRequest = async (_id: string) => {
        return await BOOKING.updateOne({_id}, {$set:{ status:"Cancel Requested"}});
    }

    const getBookingByWorkerId = async (id: string) => {
        return await BOOKING.find({"worker._id": id, isCancelled: false}).sort({ bookingTime: -1 });
    }

    const getBookingById = async (_id: string) => {
        return await BOOKING.findOne({_id});
    }

    return {
        getAllBooking,
        addBooking,
        getBookingByUserEmail,
        bookingCancel,
        cancelRequest,
        getBookingByWorkerId,
        getBookingById,
    }
}

export type BookingDbRepositoryMongoDB = typeof bookingDbRepositoryMongoDB;