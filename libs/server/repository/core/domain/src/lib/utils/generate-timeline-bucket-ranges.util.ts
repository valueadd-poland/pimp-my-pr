import { TimelineDivisionBase } from '../interfaces/timeline-division-base.interface';
import { decreaseDateByTimelineStep } from '@pimp-my-pr/server/repository/util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

export const generateTimelineBucketRanges = (
  date: Date,
  entriesCount: number,
  step: TimelineStep
): TimelineDivisionBase => {
  return Array.from(Array(entriesCount).keys())
    .map((key: number) => decreaseDateByTimelineStep(date, step, key + 1))
    .reduce(
      (result, thisDate, index, array) => ({
        ...result,
        [thisDate.getTime()]: {
          dateFrom: thisDate,
          dateTo: index ? array[index - 1] : date
        }
      }),
      {}
    );
};
