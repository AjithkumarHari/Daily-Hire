export interface Booking {
    worker: object,
    user: object,
    bookingTime: Date,
    fee: number,
    paymentId: string,
    paymentStatus: string,
    isPaid?: boolean,
    isCancelled?: boolean,
}