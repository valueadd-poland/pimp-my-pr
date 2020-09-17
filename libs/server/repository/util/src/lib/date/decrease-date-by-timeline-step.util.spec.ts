import { decreaseDateByTimelineStep } from './decrease-date-by-timeline-step.util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

describe('#decreaseDateByTimelineStep', () => {
  it('should subtract n days', () => {
    expect(
      decreaseDateByTimelineStep(new Date('1995-12-17T00:00:00'), TimelineStep.DAY, 7)
    ).toEqual(new Date('1995-12-10T00:00:00'));
  });
  it('should subtract n weeks', () => {
    expect(
      decreaseDateByTimelineStep(new Date('1995-12-17T00:00:00'), TimelineStep.WEEK, 2)
    ).toEqual(new Date('1995-12-03T00:00:00'));
  });
  it('should subtract n months', () => {
    expect(
      decreaseDateByTimelineStep(new Date('1995-12-17T00:00:00'), TimelineStep.MONTH, 7)
    ).toEqual(new Date('1995-05-01T00:00:00'));
  });
  it('should subtract n quarters', () => {
    expect(
      decreaseDateByTimelineStep(new Date('1995-12-17T00:00:00'), TimelineStep.QUARTER, 2)
    ).toEqual(new Date('1995-06-01T00:00:00'));
  });
  it('should subtract n days', () => {
    expect(
      decreaseDateByTimelineStep(new Date('2000-12-17T00:00:00'), TimelineStep.YEAR, 5)
    ).toEqual(new Date('1995-12-01T00:00:00'));
  });
  it('should return new object', () => {
    const date = new Date('1995-12-17T00:00:00');
    expect(decreaseDateByTimelineStep(date, TimelineStep.DAY, 5)).not.toBe(date);
  });
});
