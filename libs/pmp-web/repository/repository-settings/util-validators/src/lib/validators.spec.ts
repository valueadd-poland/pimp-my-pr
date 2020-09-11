import { integerValidator } from './validators';
import { FormControl } from '@angular/forms';

describe('Repository settings validators', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl(0);
  });

  describe('#integerValidator', () => {
    it('should return null if the value is positive integer', () => {
      control.setValue(10);
      expect(integerValidator(control)).toBe(null);
    });

    it('should return null if the value is negative integer', () => {
      control.setValue(-5);
      expect(integerValidator(control)).toBe(null);
    });

    it('should return null if the value is zero', () => {
      control.setValue(0);
      expect(integerValidator(control)).toBe(null);
    });

    it('should return errors if the value is float', () => {
      control.setValue(10.5);
      expect(integerValidator(control)).toEqual({
        notInteger: { value: 10.5 }
      });
    });
  });
});
