import { Pipe, PipeTransform } from '@angular/core';
import { Worker } from '../../../types/Worker';

@Pipe({
  name: 'ageSort'
})
export class AgeSortPipe implements PipeTransform {

  transform(value: Worker[], ageOrder=''): Worker[] {

    if (!value || value.length <= 1) {
      return value;
    }
 
    if (ageOrder === '') {
      return value;
    }

    else{

      if (ageOrder === 'asc') {
        return value.sort((a, b) => a.age - b.age);
      } 
      else if(ageOrder === 'desc'){
        return value.sort((a, b) => b.age - a.age);
      }
      else{
        return value;
      }

    }

  }

}

 