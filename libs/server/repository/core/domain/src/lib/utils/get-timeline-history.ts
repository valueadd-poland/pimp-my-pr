import { TimelineRecord } from '../entities/timeline-record.entity';
import { generateTimelineBucketRanges } from './generate-timeline-bucket-ranges.util';
import { divideItemsIntoBuckets } from './divide-items-into-buckets.util';
import { generateStats } from './generate-stats.util';
import { ITimeTrackable } from '@pimp-my-pr/server/repository/util';
import { getStepBeginning } from '@pimp-my-pr/server/repository/util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

export function getTimeLineHistory<T extends ITimeTrackable>(
  items: T[],
  step: TimelineStep,
  date: Date,
  bucketsCount: number
): TimelineRecord[] {
  const stepBegin = getStepBeginning(date, step);
  const bucketRanges = generateTimelineBucketRanges(stepBegin, bucketsCount, step);
  const buckets = divideItemsIntoBuckets<T>(bucketRanges, items);
  return generateStats(buckets, bucketRanges, items);
}
