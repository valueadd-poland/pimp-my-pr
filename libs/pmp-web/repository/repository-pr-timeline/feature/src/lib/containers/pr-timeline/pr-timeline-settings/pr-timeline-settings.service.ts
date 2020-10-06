import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isGreaterThanDate } from '@pimp-my-pr/pmp-web/repository/repository-pr-timeline/util-cross-date-validators';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

@Injectable()
export class PrTimelineSettingsService {
  constructor(private fb: FormBuilder) {}

  getSteps(): TimelineStep[] {
    return Object.entries(TimelineStep).map(([key, value]) => TimelineStep[key]);
  }

  getForm(): FormGroup {
    return this.fb.group({
      step: [TimelineStep.DAY, Validators.required],
      timelineTo: [new Date(), [Validators.required, isGreaterThanDate('timelineFrom')]],
      timelineFrom: [new Date(Date.now() - 1000 * 3600 * 24 * 40), Validators.required]
    });
  }
}
