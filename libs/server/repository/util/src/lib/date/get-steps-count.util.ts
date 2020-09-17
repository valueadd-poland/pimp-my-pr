import { getStepBeginning } from './get-step-beginning.util';
import { decreaseDateByTimelineStep } from './decrease-date-by-timeline-step.util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

export const getStepsCount = (dateFrom: Date, dateTo: Date, step: TimelineStep): number => {
  let stepsCount = 0;
  const fromStep = getStepBeginning(dateFrom, step);
  let toStep = getStepBeginning(dateTo, step);
  while (toStep.getTime() >= fromStep.getTime()) {
    toStep = decreaseDateByTimelineStep(toStep, step, 1);
    stepsCount++;
  }
  return stepsCount ? stepsCount - 1 : 0;
};
