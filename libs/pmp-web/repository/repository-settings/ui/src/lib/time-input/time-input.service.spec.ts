import { TestBed } from '@angular/core/testing';
import { TimeInputService } from './time-input.service';
import { TimeUnit } from '@pimp-my-pr/shared/domain';
import { ReactiveFormsModule } from '@angular/forms';

describe('TimeInputService', () => {
  let service: TimeInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeInputService],
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(TimeInputService);
  });

  describe('#getFormConfiguration', () => {
    it('return correct form group', () => {
      const form = service.getFormConfiguration();
      expect(form.controls).toHaveProperty('unit');
      expect(form.controls).toHaveProperty('time');
    });
  });

  describe('#getOutputValue', () => {
    it('return correct number of decimal places', () => {
      expect(service.getOutputValue({ unit: '5', time: '4' })).toBe(20);
    });
  });

  describe('#getDecimalPlacesNumber', () => {
    it('return correct output value', () => {
      expect(service.getDecimalPlacesNumber(0.333)).toBe(3);
    });
  });

  describe('#getUnits', () => {
    it('should return units list in correct format', () => {
      const units = service.getUnits();
      expect(units).toBeInstanceOf(Array);
      expect(units[0]).toHaveProperty('value');
      expect(units[0]).toHaveProperty('key');
    });
  });

  describe('#getErrors', () => {
    it('should give error when there are more than 2 decimal places', () => {
      expect(service.getErrors(10.22222)).toEqual({
        toManyDecimalPlaces: {
          valid: false
        }
      });
    });
    it('should not give error when there are less than 3 decimal places', () => {
      expect(service.getErrors(10.11)).toEqual({});
    });
  });

  describe('#getWithTimeUnit', () => {
    it('should return 2days for 48h', () => {
      expect(service.getWithTimeUnit(48)).toEqual([2, TimeUnit.Day]);
    });
    it('should return 2.25days for 54h', () => {
      expect(service.getWithTimeUnit(54)).toEqual([2.25, TimeUnit.Day]);
    });
    it('should return 55hours for 55h', () => {
      expect(service.getWithTimeUnit(55)).toEqual([55, TimeUnit.Hour]);
    });
  });
});
