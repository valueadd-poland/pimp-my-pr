import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pimp-my-pr-repository-settings',
  templateUrl: './repository-settings.component.html',
  styleUrls: ['./repository-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositorySettingsComponent {}
