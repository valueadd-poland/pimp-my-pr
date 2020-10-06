import { padNumberToPlaces } from './pad-number-to-places.util';
import { TimelineStep } from '../enums/timeline-step.enum';

export const formatDateWithStep = (date: Date, step: TimelineStep): string => {
  switch (step) {
    case TimelineStep.YEAR:
      return String(date.getFullYear());
    case TimelineStep.MONTH:
      return `${padNumberToPlaces(date.getMonth())}/${date.getFullYear()}`;
    case TimelineStep.DAY:
      return `${padNumberToPlaces(date.getDate())}/${padNumberToPlaces(date.getMonth())}`;
    case TimelineStep.WEEK:
      return `${padNumberToPlaces(date.getDate())}+/${padNumberToPlaces(date.getMonth())}`;
    case TimelineStep.QUARTER:
      return `${padNumberToPlaces(date.getMonth())}+/${date.getFullYear()}`;
  }
};
