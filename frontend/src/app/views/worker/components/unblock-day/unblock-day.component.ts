import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-unblock-day',
  templateUrl: './unblock-day.component.html',
  styleUrls: ['./unblock-day.component.css']
})
export class UnblockDayComponent {

  @Input() blockDay: any;
  @Output() onUnBlock : EventEmitter<Date> = new EventEmitter<Date>();

  onBlockSelected(){
    console.log(this.blockDay);
    this.onUnBlock.emit(this.blockDay) 
  }
}
