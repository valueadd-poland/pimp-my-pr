import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from '@pimp-my-pr/pmp-web/repository/domain';

@Injectable()
export class AddEditRepositoryDialogService {
  constructor(private fb: FormBuilder) {}

  initForm(repositoryToEdit: Repository): FormGroup {
    return this.fb.group({
      // TODO: add URL validator
      repositoryUrl: ['', repositoryToEdit ? null : Validators.required],
      maxLines: [repositoryToEdit ? repositoryToEdit.maxLines : null],
      maxPrs: [repositoryToEdit?.maxPrs, Validators.min(1)],
      maxWaitingTime: [repositoryToEdit ? repositoryToEdit.maxWaitingTime : null]
    });
  }
}
