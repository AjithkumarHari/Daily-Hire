import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Booking } from 'src/app/types/Booking';

@Component({
  selector: 'app-worker-appoinments',
  templateUrl: './worker-appoinments.component.html',
  styleUrls: ['./worker-appoinments.component.css']
})
export class WorkerAppoinmentsComponent {

  @Input() bookings!: Booking[];
  @Input() count!: number;

  @Output() onSearchTextChanged : EventEmitter<string> = new EventEmitter<string>();
  @Output() onCancel : EventEmitter<string> = new EventEmitter<string>();

  searchText: string = '';

  currentPage: number = 1;
  pages: number[] = [];

  ngOnInit(){
    
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['count']) {
      // React to changes in 'count' input
      const newCount = changes['count'].currentValue;
      // Do something with the new count...
      this.countPages(newCount);
    }
  }

  countPages(total: number){    
    this.pages = []
    for(let i=1;i<=Math.ceil(total/5);i++){
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

  onSearchText(){
    this.onSearchTextChanged.emit(this.searchText);
    this.currentPage = 1;
  }

  onCancelSelected(bookingId: string | undefined){
    
    this.onCancel.emit(bookingId)
  }

}
