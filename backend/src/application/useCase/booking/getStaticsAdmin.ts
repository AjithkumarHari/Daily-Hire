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
        const currentYear = currentDate.getFullYear();

        const monthlyRevenue: any =  allBookings
            .filter(booking => {
              return booking.bookingTime && new Date(booking.bookingTime).getMonth() === currentMonth;
            })
            .map(booking => booking.fee || 0)  
            .reduce((acc: number, fee: number) => acc + fee, 0);

        
        const yearlyRevenue: any = allBookings
          .filter(booking => {
            return booking.bookingTime && new Date(booking.bookingTime).getFullYear() === currentYear;
          })
          .map(booking => booking.fee || 0)  
          .reduce((acc: number, fee: number) => acc + fee, 0);
          
 
        const completedBookings = allBookings.filter((booking)=>{
          return booking.bookingTime && booking.bookingTime < currentDate
        })

        const startOfYear = new Date(currentYear, 0, 1);  
        const bookingsThisYear = allBookings.filter((booking) => {
          return booking.bookingTime && new Date(booking.bookingTime) < currentDate && new Date(booking.bookingTime) >= startOfYear;
        });

        const bookingsThisMonth = allBookings.filter((booking) => {
          return  booking.bookingTime && booking.bookingTime.getMonth() === currentMonth && booking.bookingTime < currentDate;
        });
     
        const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
        const bookingsThisWeek = allBookings.filter((booking) => {
          return booking.bookingTime && new Date(booking.bookingTime) <= currentDate && new Date(booking.bookingTime) >= firstDayOfWeek;
        });

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
            "monthlyRevenue": monthlyRevenue,
            "yearlyRevenue": yearlyRevenue,

            "completedBookings": completedBookings.length,
            "completedYearlyBookings": bookingsThisYear.length,
            "completedMonthlyBookings": bookingsThisMonth.length,
            "completedWeeklyBookings": bookingsThisWeek.length,

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