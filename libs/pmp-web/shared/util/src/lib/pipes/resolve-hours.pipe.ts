import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolveHours'
})
export class ResolveHoursPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) return `less than an hour`;

    const days: number = Math.floor(value / 24);
    const hours: number = value % 24;
    const daysLabel = days !== 0 ? (days > 1 ? `${days} days` : `${days} day`) : '';
    const hoursLabel = hours !== 0 ? (hours > 1 ? `${hours} hours` : `${hours} hour`) : '';

    return `${daysLabel} ${hoursLabel}`.trim();
  }
}
