import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datacolumnfilter'
})
export class DatacolumnfilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(value);
    console.log(...args);
    return null;
  }

}
