import { Booking } from "../../../types/Booking";
import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { BookingRepository } from "../../repository/bookingDbRepository";

export const getStaticsWorker = async (workerId: string,bookingRepository: ReturnType<BookingRepository>,) => {
    try {
        const allBookings = await bookingRepository.getBookingByWorkerId(workerId);
        if(allBookings){
            const totalRevenue = allBookings.map(booking => booking.fee).reduce((acc: any, fee) => acc + fee, 0);

            const currentDate = new Date();  
            const currentMonth = currentDate.getMonth();

            const monthlyRevenue: any =  allBookings
            .filter(booking => {
              return booking.bookingTime && new Date(booking.bookingTime).getMonth() === currentMonth;
            })
            .map(booking => booking.fee || 0)  
            .reduce((acc: number, fee: number) => acc + fee, 0);

            const completedBookings = allBookings.filter((booking)=>{
                return booking.bookingTime && booking.bookingTime < currentDate
            })

            const uniqueUserIds = [...new Set(allBookings.map((booking) => booking.user._id))];

            const bookingsThisMonth = allBookings.filter((booking) => {
                return  booking.bookingTime && booking.bookingTime.getMonth() === currentMonth;
            }); 

            const bookingsByMonth = getBookingsByMonth(allBookings as any);

            const bookingsByPayment = getBookingsByPayment(allBookings as any);

            return {
                "totalRevenue":totalRevenue,
                "totalBookingCount":allBookings.length,
                "monthlyRevenue":monthlyRevenue,
                "monthlyBookingCount": bookingsThisMonth.length,
                "completedBookings": completedBookings.length,
                "bookedUsers": uniqueUserIds.length,
                "bookingsByMonth": bookingsByMonth,
                "bookingsByPayment": bookingsByPayment
            };

        }else{
            throw new AppError("Not Found", HttpStatus.NOT_FOUND);
        }
    } catch (AppError) {
        return AppError;
    }
}


const getBookingsByMonth = (bookings: Booking[]) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const bookingsByMonth: any = {};
  
    bookings.forEach((booking) => {
        const bookingDate = new Date(booking.bookingTime);
        const month = bookingDate.getMonth(); 
    
        if (!bookingsByMonth[month]) {
            bookingsByMonth[month] = 0;
        }
    
        bookingsByMonth[month]++;
    });
  
    return Object.keys(bookingsByMonth).map((month) => ({
        month: months[Number(month)],
        bookings: bookingsByMonth[month]
    }));
};


const getBookingsByPayment = (bookings: Booking[]) => {

    const paymentAmounts = bookings.reduce((acc: any, booking) => {
        const paymentType = booking.paymentMethod;
        const amount = booking.fee;
      
        if (paymentType && amount) {
          if (!acc[paymentType]) {
            acc[paymentType] = 0;
          }
          acc[paymentType] += amount;
        }
      
        return acc;
      }, {});
      
      return Object.keys(paymentAmounts).map((paymentType) => {
        return {
          paymentType,
          amount: paymentAmounts[paymentType],
        };
      });
};