import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return 'N/A';
    }
    if (value == 1) {
      return value + ' year old';
    }
    return value + ' years old';
  }

}
