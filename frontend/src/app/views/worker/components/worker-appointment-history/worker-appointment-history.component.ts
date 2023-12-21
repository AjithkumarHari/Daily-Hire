import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Booking } from 'src/app/types/Booking';

@Component({
  selector: 'app-worker-appointment-history',
  templateUrl: './worker-appointment-history.component.html',
  styleUrls: ['./worker-appointment-history.component.css']
})
export class WorkerAppointmentHistoryComponent {

  @Input() bookings!: Booking[];
  @Input() count!: number;

  @Output() onSearchTextChanged : EventEmitter<string> = new EventEmitter<string>();

  searchText: string = '';

  currentPage: number = 1;
  pages: number[] = [];

  ngOnInit(){
    
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['count']) {
      // React to changes in 'count' input
      // const newCount = changes['count'].currentValue;
      // Do something with the new count...
      this.countPages(this.count);
    }
  }

  countPages(total: number){    
    this.pages = []
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

  onSearchText(){
    this.onSearchTextChanged.emit(this.searchText);
    this.currentPage = 1;
  }
}
