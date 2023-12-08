import { Booking } from "../../../types/Booking";
import { HttpStatus } from "../../../types/HttpStatus";
import { User } from "../../../types/User";
import { Worker } from "../../../types/Worker";
import AppError from "../../../util/appError";
import { PaymentServiceInterface } from "../../service/paymentServiceInterface";
import { BookingRepository } from "../../repository/bookingDbRepository";
import { WalletRepository } from "../../repository/walletDbRepository";
import { Transaction, Wallet } from "../../../types/Wallet";

export const bookingPayment = async (
    paymentDetails:  {user: User, worker: Worker, bookingTime: Date, paymentMethod: string},
    paymentService: ReturnType<PaymentServiceInterface>,
    bookingRepository: ReturnType<BookingRepository>,
    walletRepository: ReturnType<WalletRepository>,
    ) => {
    try {
        if(paymentDetails.paymentMethod === 'stripe'){
            const session: any = await paymentService.createSession(paymentDetails)  
            if(!session)
                throw new AppError("Not Found", HttpStatus.NOT_FOUND);
            const bookingData: Booking = {
                ...paymentDetails,
                fee: paymentDetails.worker.wageForDay,
                paymentId: session.id,
                paymentStatus: 'paid',
                status:'Confirmed'
            }
            await bookingRepository.addBooking(bookingData);        
            return {"status":"succuss",sessionUrl: session.url};
        }
        else{
            if(paymentDetails.user._id){
                const wallet = await walletRepository.getWalletByUser(paymentDetails.user._id);
                if(wallet?.userId){
                    const bookingData: Booking = {
                        ...paymentDetails,
                        fee: paymentDetails.worker.wageForDay,
                        paymentId: `dailyHire ${wallet?.id}`,
                        paymentStatus: 'paid',
                        status:'Confirmed'
                    }
                    await bookingRepository.addBooking(bookingData); 
                    const newWallet: Wallet = {
                        userId: wallet?.userId,
                        balance: wallet?.balance - paymentDetails.worker.wageForDay,
                    } 
                    const transaction: Transaction = {
                        amount: paymentDetails.worker.wageForDay,
                        time: new Date(),
                        type: 'Debit',
                        message: 'Booked worker'
                    }
                    await walletRepository.updateWallet(newWallet, transaction);
                    return {"status":"succuss","message": "booked worker using wallet"};
                }

            }
        }
    } catch (AppError) {
        return AppError;
    }
}