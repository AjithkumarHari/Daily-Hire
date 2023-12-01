import { User } from "./User";
import { Worker } from "./Worker";

export interface Booking {
    _id?: string,
    worker: Worker,
    user: User,
    bookingTime: Date,
    fee: number,
    paymentId: string,
    paymentStatus: string,
    isPaid?: boolean,
    isCancelled?: boolean,
    status?:string,
}