import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phone: number): string {
    const lastThreeDigits = phone % 1000;
    return `+91 *******${lastThreeDigits}`
  }

}
