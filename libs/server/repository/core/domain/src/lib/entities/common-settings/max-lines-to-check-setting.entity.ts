import {
  RepositoryCommonSettingType,
  RepositoryCommonSettingValidator,
  RepositoryCommonSettingValidatorConfig
} from '@pimp-my-pr/shared/domain';
import { SettingEntity } from '../setting.entity';

export class MaxLinesToCheckSettingEntity extends SettingEntity {
  static DEFAULT_VALUE = 1000;
  static Type: RepositoryCommonSettingType = 'maxTotalLines';
  constructor(userId: string) {
    super(
      MaxLinesToCheckSettingEntity.Type,
      MaxLinesToCheckSettingEntity.DEFAULT_VALUE,
      'number',
      userId
    );
  }

  validate(): boolean {
    const numValue = Number(this.value);

    return !isNaN(numValue) && numValue > 0;
  }

  getValidators(): RepositoryCommonSettingValidatorConfig[] {
    return [
      { validator: RepositoryCommonSettingValidator.REQUIRED, args: [] },
      { validator: RepositoryCommonSettingValidator.MIN, args: [1] }
    ];
  }
}
