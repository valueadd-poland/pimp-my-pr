import { ResolveHoursPipe } from './resolve-hours.pipe';

describe('ResolveHoursPipe', () => {
  let pipe: ResolveHoursPipe;

  beforeEach(() => {
    pipe = new ResolveHoursPipe();
  });
  it('expect(pipe.transform(1))', () => {
    expect(pipe.transform(1)).toBe(`1 hour`);
  });
  it('expect(pipe.transform(24))', () => {
    expect(pipe.transform(24)).toBe(`1 day`);
  });
  it('expect(pipe.transform(25))', () => {
    expect(pipe.transform(25)).toBe(`1 day 1 hour`);
  });
  it('expect(pipe.transform(26))', () => {
    expect(pipe.transform(26)).toBe(`1 day 2 hours`);
  });
  it('expect(pipe.transform(49))', () => {
    expect(pipe.transform(49)).toBe(`2 days 1 hour`);
  });
});
