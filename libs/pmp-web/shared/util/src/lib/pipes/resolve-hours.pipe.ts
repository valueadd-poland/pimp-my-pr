import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolveHours'
})
export class ResolveHoursPipe implements PipeTransform {
  transform(value: number): string {
    const days: number = Math.floor(value / 24);
    const remainder: number = value % 24;
    const daysString = days !== 0 ? (days > 1 ? `${days} days` : `${days} day`) : '';
    const remainderString =
      remainder !== 0 ? (remainder > 1 ? `${remainder} hours` : `${remainder} hour`) : '';

    return (daysString + ' ' + remainderString).trim();
  }
}
