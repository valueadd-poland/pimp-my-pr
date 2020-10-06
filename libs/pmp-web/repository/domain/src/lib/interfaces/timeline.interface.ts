import { TimelineProperties } from './timeline-properties.interface';
import { TimelineRecord } from './timeline-record.interface';

export interface Timeline extends TimelineProperties {
  data: TimelineRecord[];
}
