import { padNumberToPlaces } from './pad-number-to-places.util';

describe('#padNumberToPlaces', () => {
  it('should does not change input if it is longer than specified', () => {
    expect(padNumberToPlaces(1000, 3)).toBe('1000');
  });

  it('should add zeros at he beginning if the number is shorter', () => {
    expect(padNumberToPlaces(56, 4)).toBe('0056');
  });
});
