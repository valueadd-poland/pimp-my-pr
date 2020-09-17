import { subtractDaysFromDate } from './subtract-days-from-date.util';
import { subtractMonthsFromDate } from './subtract-months-from-date.util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

export const decreaseDateByTimelineStep = (
  date: Date,
  step: TimelineStep,
  numSteps: number
): Date => {
  switch (step) {
    case TimelineStep.DAY:
      return subtractDaysFromDate(date, numSteps);
    case TimelineStep.WEEK:
      return subtractDaysFromDate(date, 7 * numSteps);
    case TimelineStep.MONTH:
      return subtractMonthsFromDate(date, numSteps);
    case TimelineStep.QUARTER:
      return subtractMonthsFromDate(date, 3 * numSteps);
    case TimelineStep.YEAR:
      return subtractMonthsFromDate(date, 12 * numSteps);
  }
};
