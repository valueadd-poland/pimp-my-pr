import { subtractDaysFromDate } from './subtract-days-from-date.util';

describe('#subtractDaysFromDate', () => {
  it('should subtract n days', () => {
    expect(subtractDaysFromDate(new Date('1995-12-17T00:00:00'), 7)).toEqual(
      new Date('1995-12-10T00:00:00')
    );
  });
  it('should return new object', () => {
    const date = new Date('1995-12-17T00:00:00');
    expect(subtractDaysFromDate(date, 5)).not.toBe(date);
  });
});
