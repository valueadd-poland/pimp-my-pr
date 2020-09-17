import { getStepBeginning } from './get-step-beginning.util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

describe('#getStepBeginning', () => {
  it('should return day beginning', () => {
    expect(getStepBeginning(new Date('1995-12-10T12:12:32'), TimelineStep.DAY)).toEqual(
      new Date('1995-12-10T00:00:00')
    );
  });

  it('should return week beginning', () => {
    expect(getStepBeginning(new Date('1995-12-06T12:12:32'), TimelineStep.WEEK)).toEqual(
      new Date('1995-12-03T00:00:00')
    );
  });

  it('should return month beginning', () => {
    expect(getStepBeginning(new Date('1995-12-10T12:12:32'), TimelineStep.MONTH)).toEqual(
      new Date('1995-12-01T00:00:00')
    );
  });

  it('should return quarter beginning', () => {
    expect(getStepBeginning(new Date('1995-12-10T12:12:32'), TimelineStep.QUARTER)).toEqual(
      new Date('1995-09-01T00:00:00')
    );
  });

  it('should return year beginning', () => {
    expect(getStepBeginning(new Date('1995-12-10T12:12:32'), TimelineStep.YEAR)).toEqual(
      new Date('1995-01-01T00:00:00')
    );
  });

  it('should return new object', () => {
    const date = new Date('1995-12-17T00:00:00');
    expect(getStepBeginning(date, TimelineStep.DAY)).not.toBe(date);
  });
});
