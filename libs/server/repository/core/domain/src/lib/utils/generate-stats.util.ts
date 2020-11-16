import { TimelineBuckets } from '../interfaces/timeline-bucket.interface';
import { TimelineDivisionBase } from '../interfaces/timeline-division-base.interface';
import { TimelineRecord } from '../entities/timeline-record.entity';
import { ITimeTrackable } from '@pimp-my-pr/server/repository/util';

export function generateStats<T extends ITimeTrackable>(
  buckets: TimelineBuckets<T>,
  bucketRanges: TimelineDivisionBase,
  raw: T[]
): TimelineRecord[] {
  return Object.entries(buckets).map(
    ([ts, entry]): TimelineRecord => {
      const periodEnd = bucketRanges[ts].dateTo.getTime();
      const periodStart = bucketRanges[ts].dateFrom.getTime();
      const entityCount = entry.length;
      const { closedBefore, openedAfter } = raw.reduce(
        (total, current) => ({
          closedBefore:
            total.closedBefore +
            Number(!!(current.closedAt && current.closedAt.getTime() < periodStart)),
          openedAfter: total.openedAfter + Number(current.createdAt.getTime() > periodEnd)
        }),
        { closedBefore: 0, openedAfter: 0 }
      );

      const { entitySumTimeIn, entitySumTimeOpened } = entry.reduce(
        (total, current) => ({
          entitySumTimeIn: total.entitySumTimeIn + current.timeIn,
          entitySumTimeOpened:
            total.entitySumTimeOpened +
            (current.entity.closedAt
              ? Math.min(current.entity.closedAt.getTime(), periodEnd)
              : periodEnd) -
            current.entity.createdAt.getTime()
        }),
        { entitySumTimeIn: 0, entitySumTimeOpened: 0 }
      );
      let avgWaitingTime;
      if (entityCount > 0) {
        avgWaitingTime = entitySumTimeOpened / entityCount;
      } else {
        avgWaitingTime = 0;
      }

      return {
        dataFrom: new Date(Number(ts)),
        sumCount: entityCount,
        avgCount: entitySumTimeIn / (periodEnd - periodStart),
        avgWaitingTime: avgWaitingTime,
        closedBefore,
        openedAfter
      };
    }
  );
}
