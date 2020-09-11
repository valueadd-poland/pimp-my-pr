import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RepositoryFacade } from '@pimp-my-pr/pmp-web/repository/data-access';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeUnit } from '@pimp-my-pr/shared/domain';
import {
  AddEditRepositoryDialogData,
  AddRepositoryPayload,
  EditRepositoryPayload,
  Repository
} from '@pimp-my-pr/pmp-web/repository/domain';
import { SnackbarService } from '@pimp-my-pr/pmp-web/shared/domain';
import { AddEditRepositoryDialogService } from './add-edit-repository-dialog.service';
import { Router } from '@angular/router';
import { ApiException } from '@pimp-my-pr/pmp-web/shared/domain';

@UntilDestroy()
@Component({
  selector: 'pmp-add-repository-dialog',
  templateUrl: './add-edit-repository-dialog.component.html',
  styleUrls: ['./add-edit-repository-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditRepositoryDialogComponent implements OnInit {
  dialogTitle: string;
  form: FormGroup;
  maxWaitingTimeFormControl: FormControl;
  repositoryToEdit: Repository;
  submitMsg: string;
  timeUnitFormControl: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddEditRepositoryDialogData,
    private repoFacade: RepositoryFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditRepositoryDialogComponent>,
    private snackbarService: SnackbarService,
    private router: Router,
    private addEditRepositoryDialogService: AddEditRepositoryDialogService
  ) {
    if (data) {
      this.dialogTitle = data.dialogTitle;
      this.repositoryToEdit = data.repositoryToEdit;
      this.submitMsg = data.submitMsg;
    }
  }

  ngOnInit(): void {
    this.form = this.addEditRepositoryDialogService.initForm(this.repositoryToEdit);
  }

  submit(): void {
    if (this.form.valid) {
      const { repositoryUrl, maxLines, maxWaitingTime, maxPrs } = this.form.value;
      if (this.repositoryToEdit) {
        this.editRepository({
          maxLines,
          maxWaitingTime,
          maxPrs,
          repositoryId: this.repositoryToEdit.id
        });
      } else {
        this.addRepository(repositoryUrl, maxLines, maxWaitingTime, maxPrs);
      }
    }
  }

  private addRepository(
    repositoryUrl: string,
    maxLines: number,
    maxWaitingTime: number,
    maxPrs: number
  ): void {
    this.repoFacade
      .addRepository({
        repositoryUrl,
        maxLines,
        maxWaitingTime,
        maxPrs
      })
      .subscribe(
        payload => {
          this.snackbarService.open('Repository has been added');
          this.router.navigate(['repositories', payload.repository.id]);
          this.dialogRef.close();
        },
        (error: ApiException) => {
          this.snackbarService.open(error.message);
        }
      );
  }

  private editRepository(payload: EditRepositoryPayload): void {
    this.repoFacade.editRepository(payload).subscribe(
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
