import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() allWorkers : number = 0;
  @Input() maleWorkers : number = 0;
  @Input() femaleWorkers : number = 0;

  selectedGenderValue : string = 'all';
  ageSort: string = ' ';
  wageSort: string = ' ';


  @Output() genderFilterChanged : EventEmitter<string> = new EventEmitter<string>();
  @Output() ageSortChanged : EventEmitter<string> = new EventEmitter<string>();
  @Output() wageSortChanged : EventEmitter<string> = new EventEmitter<string>();

  onGenderSelectionChanged(){
    this.genderFilterChanged.emit(this.selectedGenderValue);
  }
  onAgeSelectionChanged(){
    this.ageSortChanged.emit(this.ageSort);
  }
  onWageSelectionChanged(){
    this.wageSortChanged.emit(this.wageSort);
  }
}
