import { Component, EventEmitter, Input, Output } from '@angular/core';
 
@Component({
  selector: 'app-block-day',
  templateUrl: './block-day.component.html',
  styleUrls: ['./block-day.component.css']
})
export class BlockDayComponent {
  @Input() blockDay: any;
  @Output() onBlock : EventEmitter<Date> = new EventEmitter<Date>();

  onBlockSelected(){
    console.log(this.blockDay);
    this.onBlock.emit(this.blockDay) 
  }
}
