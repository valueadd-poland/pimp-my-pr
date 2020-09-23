import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { SettingModel, SettingPatch } from '@pimp-my-pr/pmp-web/repository/domain';
import { RepositoryCommonSettingValidatorConfig } from '@pimp-my-pr/shared/domain';
import { validatorsFactory } from '@pimp-my-pr/pmp-web/repository/repository-settings/util-validators';

@Injectable()
export class CommonSettingsService {
  private translations = {
    maxPendingPR: 'Max Pending PRs for a reviewer',
    maxSumTimeForPR: 'Max Sum of time PRs are waiting',
    maxTotalLines: 'Max lines to check in pr for a reviewer'
  };

  constructor(private fb: FormBuilder) {}

  getFormGroupFromSettings(settings: SettingModel[]): FormGroup {
    return this.fb.group(
      settings.reduce(
        (all, setting) => ({
          ...all,
          [setting.id]: [setting.value, this.getValidatorsFromConfig(setting.validators)]
        }),
        {}
      )
    );
  }

  getSettingsToUpdate(form: FormGroup): SettingPatch[] {
    return Object.entries(form.controls)
      .filter(([_, control]) => control.dirty && control.valid)
      .map(([key, control]) => ({ id: key, value: control.value }));
  }

  getSettingTranslation(key: string): string {
    if (key in this.translations) {
      return this.translations[key];
    } else {
      return key;
    }
  }

  private getValidatorsFromConfig(config: RepositoryCommonSettingValidatorConfig[]): ValidatorFn[] {
    return config.map(conf => validatorsFactory(conf));
  }
}
