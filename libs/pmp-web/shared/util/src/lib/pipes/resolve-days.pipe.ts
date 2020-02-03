import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolveDays'
})
export class ResolveDaysPipe implements PipeTransform {
  transform(value: number): string {
    value = Number(value.toFixed(0));
    if (value > 1) {
      return `${value} days`;
    } else {
      return `${value} day`;
    }
  }
}
