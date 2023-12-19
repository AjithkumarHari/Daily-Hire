import { Booking } from "../../../types/Booking";
import BOOKING from "../models/bookingModel";

export const bookingDbRepositoryMongoDB = () => {

    const getAllBooking = async () => {
        return BOOKING.find().sort({ bookingTime: -1 });
    }

    const addBooking = async (bookingData: Booking) => {
        return BOOKING.create(bookingData)
    }

    const getBookingByUserId = async (userId: string) => {
        return BOOKING.find({"user._id": userId}).sort({ bookingTime: -1 });
    }

    const bookingCancel = async (_id: string) => {
        return await BOOKING.updateOne({_id}, {$set:{isCancelled: true, status:"Cancelled"}});
    }
    
    const cancelRequest = async (_id: string) => {
        return await BOOKING.updateOne({_id}, {$set:{ status:"Cancel Requested"}});
    }

    const getBookingByWorkerId = async (id: string) => {
        return await BOOKING.find({"worker._id": id}).sort({ bookingTime: -1 });
    }

    const getBookingById = async (_id: string) => {
        return await BOOKING.findOne({_id});
    }
    
    const isBooked = async (userId: string, workerId: string) => {
        return await BOOKING.findOne( { "user._id": userId, "worker._id": workerId});
    }

    return {
        getAllBooking,
        addBooking,
        getBookingByUserId,
        bookingCancel,
        cancelRequest,
        getBookingByWorkerId,
        getBookingById,
        isBooked,
    }
}

export type BookingDbRepositoryMongoDB = typeof bookingDbRepositoryMongoDB;