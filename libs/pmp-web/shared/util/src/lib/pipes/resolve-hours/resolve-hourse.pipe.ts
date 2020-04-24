import { Pipe, PipeTransform } from '@angular/core';
import { TimeUnit } from '@pimp-my-pr/shared/domain';

@Pipe({
  name: 'resolveHours'
})
export class ResolveHoursPipe implements PipeTransform {
  transform(value: number): string {
    const timeValues: { hrsInThatPeriod: number; name: string }[] = [
      { hrsInThatPeriod: +TimeUnit.Year, name: 'year' },
      { hrsInThatPeriod: +TimeUnit.Month, name: 'month' },
      { hrsInThatPeriod: +TimeUnit.Week, name: 'week' },
      { hrsInThatPeriod: +TimeUnit.Day, name: 'day' },
      { hrsInThatPeriod: +TimeUnit.Hour, name: 'hour' }
    ];

    if (!value) {
      return '-';
    }
    let timeLabel: string,
      incr = 0;

    while (!timeLabel) {
      if (!timeValues[incr]) break;

      if (value % timeValues[incr].hrsInThatPeriod === 0) {
        const valueInTheUnit = value / timeValues[incr].hrsInThatPeriod;
        if (valueInTheUnit > 1) {
          timeLabel = `${valueInTheUnit} ${timeValues[incr].name}s`;
        } else {
          timeLabel = `${valueInTheUnit} ${timeValues[incr].name}`;
        }
        break;
      }

      incr++;
    }

    return timeLabel;
  }
}
