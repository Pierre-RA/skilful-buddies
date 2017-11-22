import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badge'
})
export class BadgePipe implements PipeTransform {

  transform(value: any): any {
    let split = value.split(',');
    let result = '';
    split.forEach(text => {
      result += '<span class="badge badge-warning mr-1">' + text + '</span>';
    });
    return result;
  }

}
