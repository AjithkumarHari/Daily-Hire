import { Component } from '@angular/core';
import { Booking } from 'src/app/types/Booking';
import { AdminService } from '../../services/admin.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as fonts from "pdfmake/build/vfs_fonts";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/types/Service';
import { take } from 'rxjs';
(pdfMake as any).vfs = fonts.pdfMake.vfs;  
 
@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent {

  allBookings$: Booking[] = [];
  bookings$: Booking[] = [];
  services: Service[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  form!: FormGroup;

  constructor(
    private adminService: AdminService,
    private formBuilder : FormBuilder,
  ){}

  ngOnInit() {
    this.adminService.getAllBookings().pipe(take(1)).subscribe((data: Booking[]) => {
      this.allBookings$ = data;
      this.bookings$ = this.allBookings$;
      this.countPages(this.bookings$.length);
    });

    this.adminService.getAllServices().pipe(take(1)).subscribe((data)=> this.services = data)

    this.form = this.formBuilder.group({
      searchKey : new FormControl(null, [Validators.required]),
      serviceKey : new FormControl('All', [Validators.required]),
      statusKey : new FormControl('All', [Validators.required]),
      startDate : new FormControl('dd-mm-yyyy', [Validators.required]),
      endDate : new FormControl('dd-mm-yyyy', [Validators.required]),
    })
    
  }

  onApplySearchFilter(){
    const startDate = new Date(this.form.value.startDate); 
    const endDate = new Date(this.form.value.endDate); 
    console.log(startDate, endDate);
    

    this.bookings$ = this.bookings$.filter((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      return bookingDate >= startDate && bookingDate <= endDate;
    });

    if(this.form.value.searchKey !== null){
      this.bookings$ =  this.allBookings$.filter(booking => {
        const lowercaseText =  this.form.value.searchKey.toLowerCase();
        const lowercaseUserName = booking.user.name.toLowerCase();
        const lowercaseWorkerName = booking.worker.name.toLowerCase();
        return lowercaseUserName.includes(lowercaseText) || lowercaseWorkerName.includes(lowercaseText);
      });
    }

    if(this.form.value.serviceKey != 'All' ){
      if(this.form.value.searchKey !== null || (this.form.value.startDate != 'dd-mm-yyyy' && this.form.value.endDate != 'dd-mm-yyyy')) {
          console.log('filtered bookingss');
          this.bookings$ = this.bookings$.filter(booking => booking.worker.work == this.form.value.serviceKey);
        }
      else{
        console.log('all bookings');
        this.bookings$ = this.allBookings$.filter(booking => booking.worker.work == this.form.value.serviceKey);
      }
    }

    if(this.form.value.statusKey != 'All'){
      if(this.form.value.serviceKey != 'All' || (this.form.value.startDate != 'dd-mm-yyyy' && this.form.value.endDate != 'dd-mm-yyyy')){
        console.log('filtered bookingss');
        
        this.bookings$ = this.bookings$.filter(booking => booking.status == this.form.value.statusKey);}
      else {
       console.log('all bookings');
      
        this.bookings$ = this.allBookings$.filter(booking => booking.status == this.form.value.statusKey);}
    }
    
  }

  onFilterReset(){
    this.bookings$ = this.allBookings$;
    this.form.reset({
      serviceKey : 'All',
      statusKey: 'All'
    })
  }


  onStatusChange(bookingId: any) {  
    this.adminService
      .changeBookingStatus(bookingId)
      .pipe(take(1)).subscribe(() => {
         this.ngOnInit()
      });
  }

  countPages(total: number){
    this.pages = [];
    for(let i=1;i<=Math.ceil(total/6);i++){
      this.pages.push(i)
    }
  }

  onPrevious($event: Event) {
    $event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNext($event: Event) {
    $event.preventDefault();
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
    }
  }

  onPageClick(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  generatePdf(){
    let docDefinition: TDocumentDefinitions = {
      watermark: { text: 'DailyHire Admin Copy', color: 'gray', opacity: 0.3, bold: true, italics: false },
      content: [
        {
          text: 'DailyHire - Worker Booking Website',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#005f73'
        },
        {
          text: 'BOOKINGS REPORT',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          color: '#001219'
        },
        {
          text: 'Company Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: 'DailyHire & Co Pvt. Ltd',
                
                bold:true
              },
              { text: 'Address:  Maradu, Ernakulam, Kochi' },
              { text: 'E-mail: dailyhire@gmail.com' },
              { text: 'Contact: +91 9876781998' }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Report No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Booking Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', 'auto', 'auto', '*'],
            body: [
                      [
                        { text: 'User Name', bold: true },
                        { text: 'Worker Name', bold: true },
                        { text: 'Work Type', bold: true },
                        { text: 'Scheduled Date', bold: true },
                        { text: 'Booking Fees', bold: true },
                        { text: 'Booking Status', bold: true }
                      ],
                      ...this.bookings$.map(b => [
                        { text: b.user.name },
                        { text: b.worker.name },
                        { text: b.worker.work },
                        { text: new Date(b.bookingTime).toLocaleDateString("en-US") },
                        { text: `₹`+b.fee+`.00`},
                        { text: b.status }
                      ])
                    ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            text: "The report compiles crucial information about each booking, such as the user's name, the assigned worker's name, the scheduled time of the booking, and the booking status. It's tailored to display bookings that fall within a specific time period, enabling users to review, analyze, or manage bookings made during that span.",
            margin: [0, 0 ,0, 15]          
        },
 
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Watermark denoting "DailyHire Admin Copy." This indicates the report is specifically meant for administrative purposes or as an internal copy.',
              'The report caters to administrative needs, aiding in decision-making processes, identifying trends, or addressing any discrepancies or issues within the booking system.',
              'This is system generated bookings report.',
            ],
            margin: [0, 0 ,0, 15] 
        },
        { qr: 'text in QR' },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };
    pdfMake.createPdf(docDefinition).open()
  }

  
}
