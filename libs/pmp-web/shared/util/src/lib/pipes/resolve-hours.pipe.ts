import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolveHours'
})
export class ResolveHoursPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }

    if (value > 1) {
      return `${value} hours`;
    } else {
      return `${value} hour`;
    }
  }
}
