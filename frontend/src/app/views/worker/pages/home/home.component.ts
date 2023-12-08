import { Component } from '@angular/core';
import { WorkerService } from '../../services/worker.service';
import { WorkerState } from '../../state/worker.state';
import { Store } from '@ngrx/store';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';
import { Worker } from 'src/app/types/Worker';
import { AgBarSeriesOptions, AgChartOptions, AgCharts } from 'ag-charts-community';
import { AgChartsAngular } from 'ag-charts-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  totalRevenue: number = 0;
  totalBookingCount: number = 0;
  monthlyRevenue: number = 0;
  monthlyBookingCount: number = 0;
  completedBookings: number = 0;
  bookedUsers: number = 0;
  bookingsByMonth: any
  bookingsByPayment: any

  worker!: Worker;
  public options: AgChartOptions = {};
  public optionsTotal: AgChartOptions = {};

  public agCharts!: AgChartsAngular;

  constructor(private workerService: WorkerService, private store: Store<WorkerState>) {
  }


  ngOnInit(){
    this.store.select(selectWorkerDetails).subscribe((data)=>{
      this.worker = data;
      if(this.worker._id ){
        this.workerService.getWorkerStats(this.worker._id).subscribe((data: any)=> {
          ({
            totalRevenue: this.totalRevenue,
            totalBookingCount: this.totalBookingCount,
            monthlyRevenue: this.monthlyRevenue,
            monthlyBookingCount: this.monthlyBookingCount,
            completedBookings: this.completedBookings,
            bookedUsers: this.bookedUsers,
            bookingsByMonth: this.bookingsByMonth,
            bookingsByPayment: this.bookingsByPayment,
          } = data);
          this.options = {
            theme: 'ag-sheets-dark',
            background:{
              visible: false
            },
            data: this.bookingsByMonth,
            title: {
              text: 'Total Bookings Composition',
            },
            series: [
              {
                  type: 'area',
                  xKey: 'month',
                  yKey: 'bookings',
                  yName: 'Bookings',
              },
          ],
          };
          this.optionsTotal = {
            theme: 'ag-sheets-dark',
            background:{
              visible: false
            },
            data: this.bookingsByPayment,
            title: {
              text: 'Total Bookings Composition',
            },
            series: [
              {
                type: 'pie',
                angleKey: 'amount',
                legendItemKey: 'paymentType',
            },
          ],
          };
        })
      }
      

    })
  }

 

}
