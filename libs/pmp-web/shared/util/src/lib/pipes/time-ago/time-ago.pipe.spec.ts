import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  let pipe: TimeAgoPipe;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
  });
  it('expect(pipe.transform(0))', () => {
    expect(pipe.transform(0)).toBe(`less than an hour`);
  });
  it('expect(pipe.transform(1))', () => {
    expect(pipe.transform(1)).toBe(`1 hour`);
  });
  it('expect(pipe.transform(2))', () => {
    expect(pipe.transform(2)).toBe(`2 hours`);
  });
  it('expect(pipe.transform(25))', () => {
    expect(pipe.transform(25)).toBe(`1 day`);
  });
  it('expect(pipe.transform(49))', () => {
    expect(pipe.transform(49)).toBe(`2 days`);
  });
  it('expect(pipe.transform(1000))', () => {
    expect(pipe.transform(1000)).toBe(`1 month`);
  });
  it('expect(pipe.transform(1000))', () => {
    expect(pipe.transform(2000)).toBe(`2 months`);
  });
  it('expect(pipe.transform(10000))', () => {
    expect(pipe.transform(10000)).toBe(`1 year`);
  });
  it('expect(pipe.transform(20000))', () => {
    expect(pipe.transform(20000)).toBe(`2 years`);
  });
});
