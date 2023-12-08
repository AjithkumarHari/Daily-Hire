import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDirective } from './date.directive';


@NgModule({
  declarations: [
    DateDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DateDirective,
  ]
})
export class DirectiveModule { }
