import { ResolveHoursPipe } from './resolve-hourse.pipe';
import { TimeUnit } from '@pimp-my-pr/shared/domain';

describe('ResolveHours', () => {
  let pipe: ResolveHoursPipe;

  beforeEach(() => {
    pipe = new ResolveHoursPipe();
  });
  it('should handle 0', () => {
    expect(pipe.transform(0)).toBe(`-`);
  });
  it('should handle null', () => {
    expect(pipe.transform(null)).toBe(`-`);
  });
  it('should handle singular', () => {
    expect(pipe.transform(1)).toBe(`1 hour`);
  });
  it('should handle plural', () => {
    expect(pipe.transform(2)).toBe(`2 hours`);
  });
  it('handle days', () => {
    expect(pipe.transform(48)).toBe(`2 days`);
  });
  it('should handle exactly values', () => {
    expect(pipe.transform(49)).toBe(`49 hours`);
  });
  it('10 days', () => {
    expect(pipe.transform(10 * +TimeUnit.Day)).toBe(`10 days`);
  });
  it('2 months', () => {
    expect(pipe.transform(2 * +TimeUnit.Month)).toBe(`2 months`);
  });
});
