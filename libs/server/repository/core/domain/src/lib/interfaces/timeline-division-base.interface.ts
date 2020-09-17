import { TimelineDateRange } from './timeline-date-range.interface';

export interface TimelineDivisionBase {
  [timestamp: number]: TimelineDateRange;
}
