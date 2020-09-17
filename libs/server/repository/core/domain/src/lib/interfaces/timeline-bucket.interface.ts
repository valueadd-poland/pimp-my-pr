import { TimelineBucketItem } from './timeline-bucket-item.interface';

export interface TimelineBuckets<T> {
  [label: number]: TimelineBucketItem<T>[];
}
