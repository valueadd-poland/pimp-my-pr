import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from '@pimp-my-pr/pmp-web/repository/domain';

@Injectable()
export class AddEditRepositoryDialogService {
  constructor(private fb: FormBuilder) {}

  initForm(isEditMode: boolean, repositoryToEdit: Repository): FormGroup {
    return this.fb.group({
      repositoryUrl: ['', isEditMode ? null : Validators.required],
      maxLines: [repositoryToEdit ? repositoryToEdit.maxLines : null],
      maxWaitingTimeDefinition: this.fb.group({
        maxWaitingTime: [repositoryToEdit ? repositoryToEdit.maxWaitingTime : ''],
        timeUnit: [{ value: '' }]
      })
    });
  }
}
