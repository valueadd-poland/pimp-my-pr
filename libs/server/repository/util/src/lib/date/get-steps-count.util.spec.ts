import { getStepsCount } from './get-steps-count.util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

describe('#getStepsCount', () => {
  it('should return a correct number of steps', () => {
    expect(
      getStepsCount(
        new Date('1995-12-02T12:12:32'),
        new Date('1995-12-06T12:12:32'),
        TimelineStep.DAY
      )
    ).toBe(4);
  });
});
