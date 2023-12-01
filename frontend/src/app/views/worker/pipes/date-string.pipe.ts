import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(date:Date): string {
    const day = new Date(date);
    return day.toDateString(); 
  }

}
