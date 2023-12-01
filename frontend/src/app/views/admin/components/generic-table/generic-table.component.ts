import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent<T> {
 
  
  currentPage: number = 1;
  pages: number[] = [];

  @Input() bookingData?: T[]  
  constructor(){
    
  }
 

  ngOnInit(){
    console.log(typeof(this.bookingData));
    console.log( this.bookingData);
    
  }

  // onStatusChange(userId: any){
  //   this.adminService.changeUserStatus(userId).subscribe((data: any)=> {console.log(data)
  //     this.adminService.getAllUsers().subscribe((data)=> this.users$ = data);
  //   }
  //   )
  // }

  countPages(total: number){    
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
}
