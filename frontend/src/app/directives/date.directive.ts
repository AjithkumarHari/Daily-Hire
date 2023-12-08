import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { Booking } from '../types/Booking';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input() date: any;
  @Input() month: any;
  @Input() year: any;
  @Input() booking!: Booking[];
  @Input() blockedDates: Date[] | undefined;
  @Input() selectedDate!: Date;
  @Input() isUser: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2, ) {
    this.updateSelectedClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.updateSelectedClass();
    }
    if (changes['month']) {
      this.updateSelectedClass();
    }
    if (changes['year']) {
      this.updateSelectedClass();
    }
    if (changes['booking']) {
      this.updateSelectedClass();
    }
    if (changes['blockedDates']) {
      this.updateSelectedClass();
    }
    if (changes['selectedDate']) {
      this.updateSelectedClass();
    }

  }

  private updateSelectedClass() {

    const dateToCheck = new Date(this.year, this.month, this.date);
    dateToCheck.setHours(0, 0, 0, 0);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const selectedDateAsDate = new Date(this.selectedDate);
    selectedDateAsDate.setHours(0, 0, 0, 0);

    
    //check if date is past
    if (currentDate.getTime() > dateToCheck.getTime()) {
      this.renderer.addClass(this.el.nativeElement, 'text-gray-400');
      this.renderer.addClass(this.el.nativeElement, 'pointer-events-none');
      this.renderer.removeClass(this.el.nativeElement, 'bg-green-500');
      this.renderer.removeClass(this.el.nativeElement, 'bg-green-400/50');
      this.renderer.removeClass(this.el.nativeElement, 'bg-gray-500');
      this.renderer.removeClass(this.el.nativeElement, 'text-white');
      this.renderer.removeClass(this.el.nativeElement, 'text-white');
      this.renderer.removeClass(this.el.nativeElement, 'bg-orange-400');
      this.renderer.removeClass(this.el.nativeElement, 'bg-gray-500/70');
      this.renderer.removeClass(this.el.nativeElement, 'bg-gray-500/60');
    }else{
      this.renderer.removeClass(this.el.nativeElement, 'text-gray-400');
      this.renderer.removeClass(this.el.nativeElement, 'pointer-events-none');

      //check  if date is today
      if (currentDate.getTime() == dateToCheck.getTime()) {
        this.renderer.addClass(this.el.nativeElement, 'bg-green-500');
      }
      else{
        this.renderer.removeClass(this.el.nativeElement, 'bg-green-500');
      }

      //check bookings in that date
      if(this.booking){
        const result = this.booking.some((details) => {
            const newDate = new Date(details.bookingTime);
            newDate.setHours(0, 0, 0, 0);
            return newDate.getTime() === dateToCheck.getTime();
          });
          if (result) {
            if(this.isUser){
              this.renderer.addClass(this.el.nativeElement, 'bg-gray-500/60')
              this.renderer.addClass(this.el.nativeElement, 'pointer-events-none');
            }else{
              this.renderer.addClass(this.el.nativeElement, 'bg-green-400/50')
            }
          }
          else{
            this.renderer.removeClass(this.el.nativeElement, 'bg-green-400/50');
            this.renderer.removeClass(this.el.nativeElement, 'bg-gray-500/60');
            this.renderer.removeClass(this.el.nativeElement, 'pointer-events-none');
          }
      }

      //check if the date is blocked
      if(this.blockedDates){
        const result = this.blockedDates.some((details) => {
            const newDate = new Date(details);
            newDate.setHours(0, 0, 0, 0);
            return newDate.getTime() === dateToCheck.getTime();
          });
          if (result) {
            if(this.isUser){
              this.renderer.addClass(this.el.nativeElement, 'pointer-events-none');
            }
            this.renderer.addClass(this.el.nativeElement, 'bg-gray-500/70');
            this.renderer.addClass(this.el.nativeElement, 'text-white');
          }
          else{
            this.renderer.removeClass(this.el.nativeElement, 'bg-gray-500/70');
             
          }
      }

      if (selectedDateAsDate.getTime() == dateToCheck.getTime()) {
        this.renderer.addClass(this.el.nativeElement, 'text-white');
        this.renderer.addClass(this.el.nativeElement, 'bg-orange-400');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'text-white');
        this.renderer.removeClass(this.el.nativeElement, 'bg-orange-400');
      }

    }

 
  }

}
