import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resolveHours'
})
export class ResolveHoursPipe implements PipeTransform {
  transform(value: number): string {
    const timeValues: { hrsInThatPeriod: number; name: string }[] = [
      { hrsInThatPeriod: 8760, name: 'year' },
      { hrsInThatPeriod: 730, name: 'month' },
      { hrsInThatPeriod: 168, name: 'week' },
      { hrsInThatPeriod: 24, name: 'day' },
      { hrsInThatPeriod: 1, name: 'hour' }
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
