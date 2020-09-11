import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { FormData } from './form-data.interface';
import { TimeUnit } from '@pimp-my-pr/shared/domain';

@Injectable()
export class TimeInputService {
  constructor(private fb: FormBuilder) {}

  getFormConfiguration(): FormGroup {
    return this.fb.group({
      time: null,
      unit: Number(TimeUnit.Hour)
    });
  }

  getUnits(): { value: number; key: string }[] {
    return Object.entries(TimeUnit).map(([key, hours]) => ({ key, value: Number(hours) }));
  }

  getOutputValue(values: FormData): number {
    return Number(values.time) * Number(values.unit);
  }

  externalValueUpdate(formHandle: FormGroup, value: number): void {
    if (value) {
      const [inp, unit] = this.getWithTimeUnit(value);
      const s = TimeUnit.Hour;
      formHandle.get('time').setValue(inp);
      formHandle.get('unit').setValue(Number(unit));
    }
  }

  getErrors(value: number): ValidationErrors {
    let errors = {};
    // has less than 3 decimal places
    const decimalPlaces = this.getDecimalPlacesNumber(value);
    if (decimalPlaces > 2) {
      errors = {
        ...errors,
        toManyDecimalPlaces: {
          valid: false
        }
      };
    }
    return errors;
  }

  getWithTimeUnit(input: number): [number, TimeUnit] {
    let resultTime = input;
    let resultUnit = TimeUnit.Hour;

    this.getUnits()
      .sort((a, b) => b.value - a.value)
      .some(entry => {
        if (entry.value < input && this.getDecimalPlacesNumber(input / entry.value) < 3) {
          resultTime = input / entry.value;
          resultUnit = TimeUnit[entry.key];
          return true;
        }
        return false;
      });

    return [resultTime, resultUnit];
  }

  getDecimalPlacesNumber(num: number): number {
    const div = String(num).split('.');

    return div.length < 2 ? 0 : div[1].length;
  }
}
