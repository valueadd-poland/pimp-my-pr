import { TimelineDivisionBase } from '../interfaces/timeline-division-base.interface';
import { TimelineBuckets } from '../interfaces/timeline-bucket.interface';

export function generateTimelineBuckets<T>(div: TimelineDivisionBase): TimelineBuckets<T> {
  return Object.entries(div).reduce(
    (total, [timestamp, _]) => ({
      ...total,
      [Number(timestamp)]: []
    }),
    {}
  );
}
