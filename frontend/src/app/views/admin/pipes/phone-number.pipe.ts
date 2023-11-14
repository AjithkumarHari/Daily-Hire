import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phoneNumber: number | undefined ): string {
    if(typeof(phoneNumber)== 'number')
      return `+91 ${phoneNumber}`;
    else
      return `Google User`;
  }

}
