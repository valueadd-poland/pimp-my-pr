import { AbstractControl } from '@angular/forms';

export const isGreaterThanDate = (lowerName: string) => {
  return (control: AbstractControl) => {
    return !!control.parent &&
      !!control.parent.value &&
      control.parent.controls[lowerName].value.getTime() < control.value.getTime()
      ? null
      : {
          isGreaterThanLowerBound: false
        };
  };
};
