import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repository } from '@pimp-my-pr/pmp-web/repository/domain';
import { TimeUnit } from '@pimp-my-pr/shared/domain';

@Injectable()
export class AddEditRepositoryDialogService {
  constructor(private fb: FormBuilder) {}

  initForm(repositoryToEdit: Repository): FormGroup {
    return this.fb.group({
      // TODO: add URL validator
      repositoryUrl: [null, repositoryToEdit ? null : Validators.required],
      maxLines: [repositoryToEdit?.maxLines, Validators.min(1)],
      maxPrs: [repositoryToEdit?.maxPrs, Validators.min(1)],
      maxWaitingTimeDefinition: this.fb.group({
        maxWaitingTime: repositoryToEdit?.maxWaitingTime,
        timeUnit: TimeUnit.Hour
      })
    });
  }
}
