import { BookingRepository } from "../../repository/bookingDbRepository"; 

export const isBooked = async (userId: string, workerId: string,  bookingRepository: ReturnType<BookingRepository>) => {
    try {
        const result: any = await bookingRepository.isBooked(userId, workerId);
        if(result){
            return  { isBooked: true };
        }else{
            return { isBooked: false };
        }
       
    } catch (AppError) {
        return AppError;
    }
}