import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchKey: string = '';

  @Output() searchKeyChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchKeyChange(){
    this.searchKeyChanged.emit(this.searchKey);
  }
}
