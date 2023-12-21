import { Booking } from "../../../types/Booking";
import { HttpStatus } from "../../../types/HttpStatus";
import { User } from "../../../types/User";
import { Transaction, Wallet } from "../../../types/Wallet";
import AppError from "../../../util/appError";
import { BookingRepository } from "../../repository/bookingDbRepository"; 
import { WalletRepository } from "../../repository/walletDbRepository";

export const cancelBooking = async (bookingId: string,  
    bookingRepository: ReturnType<BookingRepository>,
    walletRepository: ReturnType<WalletRepository>,
    ) => {
    try {
        const result: any = await bookingRepository.bookingCancel(bookingId);

        if(!result)
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);

        const cancelledBooking: Booking | null = await bookingRepository.getBookingById(bookingId);

        if(cancelledBooking?.fee){
            if(cancelledBooking.user._id) {      
                const userWallet: any = await walletRepository.getWalletByUser(cancelledBooking.user._id);
                if(userWallet){
                    const wallet: Wallet = {
                        userId: userWallet?.userId,
                        balance: userWallet?.balance + cancelledBooking.fee,
                    } 
                    const transaction: Transaction = {
                        amount: cancelledBooking.fee,
                        time: new Date(),
                        type: 'Credit',
                        message: 'Refund on cancellation'
                    }
                    await walletRepository.updateWallet(wallet, transaction);
                    return {status: "success", message:"BOOKING CANCELLATION SUCCESS"};
                }
            }
        }
       
    } catch (AppError) {
        return AppError;
    }
}