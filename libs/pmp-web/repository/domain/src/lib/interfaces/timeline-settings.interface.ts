import { TimelineStep } from '@pimp-my-pr/shared/domain';

export interface TimelineSettings {
  step: TimelineStep;
  timelineFrom: Date;
  timelineTo: Date;
}
