import { TimelineDivisionBase } from '../interfaces/timeline-division-base.interface';
import { TimelineBuckets } from '../interfaces/timeline-bucket.interface';
import { generateTimelineBuckets } from './generate-timeline-buckets.util';
import { wrapInBucketItem } from './wrap-in-bucket-item.util';
import { ITimeTrackable } from '@pimp-my-pr/server/repository/util';

export function divideItemsIntoBuckets<T extends ITimeTrackable>(
  bucketRanges: TimelineDivisionBase,
  items: T[]
): TimelineBuckets<T> {
  const buckets = generateTimelineBuckets<T>(bucketRanges);

  items
    .map(pr => wrapInBucketItem(pr))
    .forEach(current => {
      Object.entries(bucketRanges)
        .map(([ts, record]) => {
          const lowerBound = Math.max(
            record.dateFrom.getTime(),
            current.entity.createdAt.getTime()
          );
          const upperBound = current.entity.closedAt
            ? Math.min(record.dateTo.getTime(), current.entity.closedAt.getTime())
            : record.dateTo.getTime();
          return {
            labelTimestamp: Number(ts),
            timeIn: upperBound - lowerBound,
            rangeSize: record.dateTo.getTime() - record.dateFrom.getTime()
          };
        })
        .filter(row => row.timeIn > 0)
        .forEach(currentEntry => {
          buckets[currentEntry.labelTimestamp].push({
            timeIn: currentEntry.timeIn,
            entity: current.entity
          });
        });
    });

  return buckets;
}
