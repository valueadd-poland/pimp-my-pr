import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { TimeInputService } from './time-input.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'pmp-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    },
    TimeInputService
  ]
})
export class TimeInputComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() label: string;
  form: FormGroup;
  unitControl: AbstractControl;
  timeControl: AbstractControl;
  units: { value: number; key: string }[];
  control: AbstractControl;

  private changeHandler: (output: number) => void;

  constructor(private service: TimeInputService, private injector: Injector) {
    this.form = this.service.getFormConfiguration();
    this.unitControl = this.form.get('unit');
    this.timeControl = this.form.get('time');
    this.units = this.service.getUnits();
  }

  registerOnChange(fn: (output: number) => void): void {
    this.changeHandler = fn;
  }

  registerOnTouched(fn: () => void): void {}

  writeValue(obj: number): void {
    this.service.externalValueUpdate(this.form, obj);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.control) this.timeControl.setValidators(this.control.validator);
    return this.service.getErrors(control.value);
  }

  updateTimeUnitValidation = (time: number): void => {
    if (time && time > 0) {
      this.unitControl.setValidators(Validators.required);
      this.unitControl.markAsTouched();
      this.unitControl.enable();
    } else {
      this.unitControl.markAsUntouched();
      this.unitControl.disable();
      this.unitControl.clearValidators();
    }

    this.unitControl.updateValueAndValidity();
  };

  ngOnInit(): void {
    this.control = this.injector.get(NgControl).control;
    this.timeControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(this.updateTimeUnitValidation);
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        values => this.changeHandler && this.changeHandler(this.service.getOutputValue(values))
      );
  }
}
