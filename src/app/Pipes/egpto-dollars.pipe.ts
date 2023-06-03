import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eGPtoDollars'
})
export class EGPtoDollarsPipe implements PipeTransform {

  transform(value: number,): number {
    return value/38;
  }

}
