import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RepositoryFacade } from '@pimp-my-pr/pmp-web/repository/data-access';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { TimeUnit } from '@pimp-my-pr/shared/domain';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'pimp-my-pr-add-repository-dialog',
  templateUrl: './add-repository-dialog.component.html',
  styleUrls: ['./add-repository-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRepositoryDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  maxWaitingTimeFormControl: FormControl;
  timeUnitFormControl: FormControl;
  TimeUnit = TimeUnit;

  constructor(
    private repoFacade: RepositoryFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRepositoryDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initForm();
    this.initializeMaxWaitingTimeDefinitionControls();
  }

  initForm(): void {
    this.form = this.fb.group({
      repositoryUrl: ['', Validators.required],
      maxLines: [],
      maxWaitingTimeDefinition: this.fb.group({
        maxWaitingTime: [],
        timeUnit: [{ value: '', disabled: true }]
      })
    });
  }

  initializeMaxWaitingTimeDefinitionControls(): void {
    this.maxWaitingTimeFormControl = (this.form.controls.maxWaitingTimeDefinition as FormGroup)
      .controls.maxWaitingTime as FormControl;
    this.timeUnitFormControl = (this.form.controls.maxWaitingTimeDefinition as FormGroup).controls
      .timeUnit as FormControl;

    this.maxWaitingTimeFormControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(this.updateTimeUnitValidation);
  }

  submit(): void {
    if (this.form.valid) {
      const { repositoryUrl, maxLines } = this.form.value;
      this.repoFacade
        .addRepository({
          repositoryUrl,
          maxLines,
          maxWaitingTime: this.maxWaitingTimeFormControl.value
            ? this.maxWaitingTimeFormControl.value * this.timeUnitFormControl.value
            : null
        })
        .subscribe(
          () => {
            // TODO: move to separate lib with service e.g SnackbarService
            this.snackBar.open('Repository has been added', '', {
              duration: 2000
            });
            this.dialogRef.close();
          },
          error => {
            // TODO: move to separate lib with service e.g SnackbarService
            this.snackBar.open('Something went wrong. Repository was not added', '', {
              duration: 2000
            });
          }
        );
    }
  }

  updateTimeUnitValidation = (maxWaitingTime: number) => {
    if (maxWaitingTime && maxWaitingTime > 0) {
      this.timeUnitFormControl.setValidators(Validators.required);
      this.timeUnitFormControl.markAsTouched();
      this.timeUnitFormControl.enable();
    } else {
      this.timeUnitFormControl.markAsUntouched();
      this.timeUnitFormControl.disable();
      this.timeUnitFormControl.clearValidators();
    }

    this.timeUnitFormControl.updateValueAndValidity();
  };
}
