import { TimelineBucketItem } from '../interfaces/timeline-bucket-item.interface';

export function wrapInBucketItem<T>(item: T): TimelineBucketItem<T> {
  return {
    timeIn: 0,
    entity: item
  };
}
