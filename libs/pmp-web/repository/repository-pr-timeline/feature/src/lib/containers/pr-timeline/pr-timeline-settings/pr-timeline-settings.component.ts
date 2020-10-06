import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrTimelineSettingsService } from './pr-timeline-settings.service';
import { FormGroup } from '@angular/forms';
import { TimelineSettings } from '@pimp-my-pr/pmp-web/repository/domain';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pimp-my-pr-repository-pr-timeline-settings',
  templateUrl: './pr-timeline-settings.component.html',
  styleUrls: ['./pr-timeline-settings.component.scss'],
  providers: [PrTimelineSettingsService]
})
export class PrTimelineSettingsComponent implements OnInit {
  @Output() settingsChanged: EventEmitter<TimelineSettings> = new EventEmitter<TimelineSettings>();
  @Input() disabled: boolean;
  form: FormGroup;
  steps: TimelineStep[];

  constructor(private service: PrTimelineSettingsService) {}

  ngOnInit(): void {
    this.form = this.service.getForm();
    this.steps = this.service.getSteps();
  }

  submit(): void {
    this.settingsChanged.emit(this.form.value as TimelineSettings);
  }
}
