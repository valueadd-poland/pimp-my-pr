import { AbstractControl, ValidationErrors } from '@angular/forms';

export function integerValidator(control: AbstractControl): ValidationErrors | null {
  const numValue = Number(control.value);
  if (!isNaN(numValue) && numValue === Math.floor(numValue)) {
    return null;
  } else {
    return {
      notInteger: {
        value: control.value
      }
    };
  }
}
