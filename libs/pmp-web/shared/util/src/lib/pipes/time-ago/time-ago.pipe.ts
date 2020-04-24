import { Pipe, PipeTransform } from '@angular/core';
import { TimeUnit } from '@pimp-my-pr/shared/domain';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: number): string {
    const timeValues: { hrsInThatPeriod: number; name: string }[] = [
      { hrsInThatPeriod: +TimeUnit.Year, name: 'year' },
      { hrsInThatPeriod: +TimeUnit.Month, name: 'month' },
      { hrsInThatPeriod: +TimeUnit.Week, name: 'week' },
      { hrsInThatPeriod: +TimeUnit.Day, name: 'day' },
      { hrsInThatPeriod: +TimeUnit.Hour, name: 'hour' }
    ];

    let timeLabel: string,
      incr = 0;

    while (!timeLabel) {
      if (!timeValues[incr]) break;

      const numOfGivenTimePeriodUnitsInGivenHoursValue = Math.floor(
        value / timeValues[incr].hrsInThatPeriod
      );

      if (numOfGivenTimePeriodUnitsInGivenHoursValue > 1) {
        timeLabel = `${numOfGivenTimePeriodUnitsInGivenHoursValue} ${timeValues[incr].name}s`;
        break;
      }

      if (numOfGivenTimePeriodUnitsInGivenHoursValue > 0)
        timeLabel = `${numOfGivenTimePeriodUnitsInGivenHoursValue} ${timeValues[incr].name}`;

      incr++;
    }

    return timeLabel || `less than an hour`;
  }
}
