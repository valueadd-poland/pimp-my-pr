import { SettingEntity } from '../setting.entity';
import {
  RepositoryCommonSettingType,
  RepositoryCommonSettingValidator,
  RepositoryCommonSettingValidatorConfig
} from '@pimp-my-pr/shared/domain';

export class MaxPendingPrSettingEntity extends SettingEntity {
  static DEFAULT_VALUE = 10;
  static Type: RepositoryCommonSettingType = 'maxPendingPR';
  constructor(userId: string) {
    super(
      MaxPendingPrSettingEntity.Type,
      MaxPendingPrSettingEntity.DEFAULT_VALUE,
      'number',
      userId
    );
  }

  validate(): boolean {
    const numValue = Number(this.value);

    return !isNaN(numValue) && numValue > 0 && numValue === Math.floor(numValue);
  }

  getValidators(): RepositoryCommonSettingValidatorConfig[] {
    return [
      { validator: RepositoryCommonSettingValidator.REQUIRED, args: [] },
      { validator: RepositoryCommonSettingValidator.MIN, args: [1] },
      { validator: RepositoryCommonSettingValidator.INTEGER, args: [] }
    ];
  }
}
