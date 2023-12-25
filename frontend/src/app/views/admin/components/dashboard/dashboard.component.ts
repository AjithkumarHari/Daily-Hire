import { Component } from '@angular/core';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from 'ag-charts-community'; 
import { AdminService } from '../../services/admin.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  totalBookingCount: number = 0;
  totalRevenue: number = 0;
  monthlyBookingCount: number = 0;
  monthlyRevenue: number = 0;
  yearlyRevenue: number = 0;
  completedBookings: number = 0;
  completedYearlyBookings: number = 0;
  completedMonthlyBookings: number = 0;
  completedWeeklyBookings: number = 0;

  userCount: number = 0;
  workerCount: number = 0;
  serviceCount: number = 0;
  reviewCount: number = 0;
  bookingsByMonth: any;
  bookingsByPayment: any;
  bookingsByService: any;

  public options: AgChartOptions = {};
  public optionsPie: AgChartOptions = {};
  public optionsBar: AgChartOptions = {};

    constructor( private adminService: AdminService) {
       
    }

    ngOnInit(){
      this.adminService.getStatistics().pipe(take(1)).subscribe((data: any)=>{
        // console.log(data);

        ({
          totalBookingCount: this.totalBookingCount,
          totalRevenue: this.totalRevenue,
          monthlyBookingCount: this.monthlyBookingCount,
          monthlyRevenue: this.monthlyRevenue,
          yearlyRevenue: this.yearlyRevenue,
          completedBookings: this.completedBookings,
          completedYearlyBookings: this.completedYearlyBookings,
          completedMonthlyBookings: this.completedMonthlyBookings,
          completedWeeklyBookings: this.completedWeeklyBookings,
          userCount: this.userCount,
          workerCount: this.workerCount,
          serviceCount: this.serviceCount,
          reviewCount: this.reviewCount,
          bookingsByMonth: this.bookingsByMonth,
          bookingsByPayment: this.bookingsByPayment,
          bookingsByService: this.bookingsByService
        } = data);
        this.options = {
          background:{
            visible: false
          },
            title: {
                text: 'Booking by Month',
            },
            data: this.bookingsByMonth,
            series: [
                {
                    type: 'area',
                    xKey: 'month',
                    yKey: 'bookings',
                    yName: 'Bookings',
                    stroke: 'blue',
                    strokeWidth: 3,
                    fill: 'lightBlue',
                    marker: {
                        enabled: true,
                        fill: 'blue',
                    },
                },
               
            ],
        };
        this.optionsPie = {
          background:{
            visible: false
          },
          data: this.bookingsByPayment,
          title: {
              text: 'Bookings by Payment',
          },
          series: [
              {
                  type: 'pie',
                  angleKey: 'amount',
                  legendItemKey: 'paymentType',
              },
          ],
        };
        this.optionsBar = {
          background:{
            visible: false
          },
          title: {
              text: "Bookings By Service Category",
          },
          subtitle: {
              text: 'Users bookings based on the workers category',
          },
          data: this.bookingsByService,
          series: [
              {
                  type: 'bar',
                  xKey: 'service',
                  yKey: 'booking',
                  yName: 'Bookings',
              },
              
          ],
        };
        
      })
    }
  
}
