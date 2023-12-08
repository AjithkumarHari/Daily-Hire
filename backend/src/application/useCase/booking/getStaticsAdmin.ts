import { Booking } from "../../../types/Booking";
import { HttpStatus } from "../../../types/HttpStatus";
import { Worker } from "../../../types/Worker";
import AppError from "../../../util/appError";
import { BookingRepository } from "../../repository/bookingDbRepository";
import { ReviewRepository } from "../../repository/reviewDbRepository";
import { ServiceRepository } from "../../repository/serviceDbRepository";
import { UserDbInterface } from "../../repository/userDbRepository";
import { WorkerRepository } from "../../repository/workerDbRepository";

export const getStaticsAdmin = async (
    userRepository: ReturnType<UserDbInterface>,
    workerRepository: ReturnType<WorkerRepository>,
    serviceRepository: ReturnType<ServiceRepository>,
    reviewRepository: ReturnType<ReviewRepository>,
    bookingRepository: ReturnType<BookingRepository>,
    ) => {
    try {

        const allBookings = await bookingRepository.getAllBooking();
        const totalRevenue = allBookings.map(booking => booking.fee).reduce((acc: any, fee) => acc + fee, 0);
        const currentDate = new Date();  
        const currentMonth = currentDate.getMonth();

        const monthlyRevenue: any =  allBookings
            .filter(booking => {
              return booking.bookingTime && new Date(booking.bookingTime).getMonth() === currentMonth;
            })
            .map(booking => booking.fee || 0)  
            .reduce((acc: number, fee: number) => acc + fee, 0);

        const bookingsThisMonth = allBookings.filter((booking) => {
            return  booking.bookingTime && booking.bookingTime.getMonth() === currentMonth;
        });

        const completedBookings = allBookings.filter((booking)=>{
            return booking.bookingTime && booking.bookingTime < currentDate
        })

        const allusers = await userRepository.getAllUsers();
        const allWorkers = await workerRepository.getAllWorkers();
        const allServices  = await serviceRepository.getAllServices();
        const allReviews = await reviewRepository.getAllReview();  
        const bookingsByMonth = getBookingsByMonth(allBookings as any);
        const bookingsByPayment = getBookingsByPayment(allBookings as any);
        const bookingsByService = getBookingsByService(allBookings as any);

        return {
            "totalBookingCount": allBookings.length,
            "totalRevenue": totalRevenue,
            "monthlyBookingCount": bookingsThisMonth.length,
            "monthlyRevenue": monthlyRevenue,
            "completedBookings": completedBookings.length,
            "userCount": allusers.length,
            "workerCount": allWorkers?.length,
            "serviceCount": allServices.length,
            "reviewCount": allReviews.length,
            "bookingsByMonth": bookingsByMonth,
            "bookingsByPayment": bookingsByPayment,
            "bookingsByService": bookingsByService
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


const getBookingsByService = (bookings: Booking[]) => {

    const bookingsPerService = bookings.reduce((acc: any, booking: any) => {
        const service = booking.worker?.work;
      
        if (service) {
          if (!acc[service]) {
            acc[service] = 0;
          }
          acc[service]++;
        }
      
        return acc;
    }, {});
      
    return Object.keys(bookingsPerService).map((service) => {
        return {
        service,
        booking: bookingsPerService[service],
        };
    });
};