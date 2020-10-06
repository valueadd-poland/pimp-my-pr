import { TimelineStep } from '@pimp-my-pr/shared/domain';

export interface TimelineProperties {
  step: TimelineStep;
  dateFrom: Date;
  trackedFrom: Date;
  totalPrs: number;
}
