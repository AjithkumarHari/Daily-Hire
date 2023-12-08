import {Schema, model} from "mongoose";

const bookingSchema = new Schema(
    {
        worker: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        bookingTime: {
            type: Date,
            require: true,
        },
        fee: {
            type: Number,
            require: true,
        },
        isPaid: {
            type: Boolean,
            default: true
        },
        isCancelled: {
            type: Boolean,
            default: false
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            require: true
        },
        paymentMethod: {
            type: String,
            require: true
        },
        status: {
            type: String,
            require: true
        },

    },
    { timestamps : true}
)

const BOOKING = model("Booking", bookingSchema, "booking");

export default BOOKING;