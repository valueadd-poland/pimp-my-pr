import { subtractMonthsFromDate } from './subtract-months-from-date.util';

describe('#subtractMonthsFromDate', () => {
  it('should subtract n months if there is no year-switch necessary', () => {
    expect(subtractMonthsFromDate(new Date('1995-12-17T00:00:00'), 5)).toEqual(
      new Date('1995-07-01T00:00:00')
    );
  });
  it('should subtract n months if there is an year-switch necessary', () => {
    expect(subtractMonthsFromDate(new Date('1995-01-17T00:00:00'), 2)).toEqual(
      new Date('1994-11-01T00:00:00')
    );
  });
  it('should return new object', () => {
    const date = new Date('1995-12-17T00:00:00');
    expect(subtractMonthsFromDate(date, 5)).not.toBe(date);
  });
});
