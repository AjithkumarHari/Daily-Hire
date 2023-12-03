import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupeesPipe'
})
export class RupeesPipe implements PipeTransform {

  transform(balance: number): string {
    return `₹${balance}.00`;
  }

}
