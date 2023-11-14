import { Pipe, PipeTransform } from '@angular/core';
import { Worker } from '../../../types/Worker';

@Pipe({
  name: 'wageSort'
})
export class WageSortPipe implements PipeTransform {

  transform(value: Worker[], wageOrder=''): Worker[] {
    if (!value || value.length <= 1) {
      return value;
    }
 
    if (wageOrder === '') {
      return value;
    }

    else{

      if (wageOrder === 'asc') {
        return value.sort((a, b) => a.wageForDay - b.wageForDay);
      } 
      else if(wageOrder === 'desc'){
        return value.sort((a, b) => b.wageForDay - a.wageForDay);
      }
      else{
        return value;
      }

    }
  }

}
