import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RepositoryFacade } from '@pimp-my-pr/pmp-web/repository/data-access';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeUnit } from '@pimp-my-pr/shared/domain';
import { AddEditRepositoryDialogData, Repository } from '@pimp-my-pr/pmp-web/repository/domain';
import { SnackbarService } from '@pimp-my-pr/pmp-web/shared/domain';
import { AddEditRepositoryDialogService } from './add-edit-repository-dialog.service';

@UntilDestroy()
@Component({
  selector: 'pmp-add-repository-dialog',
  templateUrl: './add-edit-repository-dialog.component.html',
  styleUrls: ['./add-edit-repository-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditRepositoryDialogComponent implements OnInit, OnDestroy {
  dialogTitle: string;
  form: FormGroup;
  isEditMode: boolean;
  maxWaitingTimeFormControl: FormControl;
  repositoryToEdit: Repository;
  submitMsg: string;
  timeUnitFormControl: FormControl;
  TimeUnit = TimeUnit;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddEditRepositoryDialogData,
    private repoFacade: RepositoryFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditRepositoryDialogComponent>,
    private snackbarService: SnackbarService,
    private addEditRepositoryDialogService: AddEditRepositoryDialogService
  ) {
    if (!!data) {
      this.dialogTitle = data.dialogTitle;
      this.isEditMode = data.isEditMode;
      this.repositoryToEdit = data.repositoryToEdit;
      this.submitMsg = data.submitMsg;
    }
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initForm();
    this.initializeMaxWaitingTimeDefinitionControls();
  }

  initForm(): void {
    this.form = this.addEditRepositoryDialogService.initForm(
      this.isEditMode,
      this.repositoryToEdit
    );
    this.form
      .get('maxWaitingTimeDefinition')
      .get('timeUnit')
      .setValue(TimeUnit.Hour);
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
      const maxWaitingTime = this.maxWaitingTimeFormControl.value
        ? this.maxWaitingTimeFormControl.value * this.timeUnitFormControl.value
        : null;
      if (this.isEditMode) {
        this.editRepository(maxLines, maxWaitingTime);
      } else {
        this.addRepository(repositoryUrl, maxLines, maxWaitingTime);
      }
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

  private addRepository(repositoryUrl: string, maxLines: number, maxWaitingTime: number): void {
    this.repoFacade
      .addRepository({
        repositoryUrl,
        maxLines,
        maxWaitingTime
      })
      .subscribe(
        () => {
          this.snackbarService.open('Repository has been added');
          this.dialogRef.close();
        },
        error => {
          this.snackbarService.open('Something went wrong. Repository was not added');
        }
      );
  }

  private editRepository(maxLines: number, maxWaitingTime: number): void {
    this.repoFacade
      .editRepository({
        repositoryId: this.repositoryToEdit.id,
        maxLines,
        maxWaitingTime
      })
      .subscribe(
        () => {
          this.snackbarService.open('Repository has been updated');
          this.dialogRef.close();
        },
        error => {
          this.snackbarService.open('Something went wrong. Repository was not updated');
        }
      );
  }
}
