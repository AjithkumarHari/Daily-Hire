import { Component, Input, SimpleChanges } from '@angular/core';
import { Wallet } from 'src/app/types/Wallet';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent {

  currentPage: number = 1;
  pages: number[] = [];

  @Input() wallet!: Wallet;
  @Input() count: number | undefined;

  ngOnChanges(changes: SimpleChanges){
    if (changes['count']) {
      const newCount = changes['count'].currentValue;
      this.countPages(newCount);
    }
  }

  countPages(total: number){    
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
  
}
