import { Component, OnInit } from '@angular/core';
import { SettingsFacade } from '@pimp-my-pr/pmp-web/repository/repository-settings/data-access';
import { Observable, zip } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { SettingModel } from '@pimp-my-pr/pmp-web/repository/domain';
import { CommonSettingsService } from './common-settings.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnackbarService } from '@pimp-my-pr/pmp-web/shared/domain';

@UntilDestroy()
@Component({
  selector: 'pmp-web-repository-settings-form',
  templateUrl: './common-settings.component.html',
  styleUrls: ['./common-settings.component.scss'],
  providers: [CommonSettingsService]
})
export class CommonSettingsComponent {
  settings$: Observable<SettingModel[]>;
  form: FormGroup;

  constructor(
    private settingsFacade: SettingsFacade,
    private formService: CommonSettingsService,
    private snackbarService: SnackbarService
  ) {
    this.settings$ = this.settingsFacade.settingModelCollection$;
    this.settingsFacade.getSettingModelCollection();
    this.settings$
      .pipe(untilDestroyed(this))
      .subscribe(settings => (this.form = this.formService.getFormGroupFromSettings(settings)));
  }

  translate(key: string): string {
    return this.formService.getSettingTranslation(key);
  }

  submit(): void {
    const toUpdate = this.formService.getSettingsToUpdate(this.form);
    if (toUpdate.length > 0) {
      this.settingsFacade
        .updateSettingModel({
          patch: toUpdate
        })
        .subscribe(
          () => this.snackbarService.open('Settings saved!'),
          () => this.snackbarService.open('Cannot save settings')
        );
    }
  }
}
