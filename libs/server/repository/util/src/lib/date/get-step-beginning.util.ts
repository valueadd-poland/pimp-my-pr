import { subtractDaysFromDate } from './subtract-days-from-date.util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

export const getStepBeginning = (date: Date, step: TimelineStep): Date => {
  let dateNew = new Date(date);
  switch (step) {
    case TimelineStep.YEAR:
      dateNew.setMonth(0, 1);
      break;
    case TimelineStep.QUARTER:
      dateNew.setMonth(Math.floor(dateNew.getMonth() / 3) * 3 - 1, 1);
      break;
    case TimelineStep.MONTH:
      dateNew.setDate(1);
      break;
    case TimelineStep.WEEK:
      dateNew = subtractDaysFromDate(dateNew, dateNew.getDay());
      break;
  }
  dateNew.setHours(0, 0, 0, 0);
  return dateNew;
};
