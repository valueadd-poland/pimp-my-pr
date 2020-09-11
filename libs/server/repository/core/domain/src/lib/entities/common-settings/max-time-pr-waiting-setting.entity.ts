import { SettingEntity } from '../setting.entity';
import {
  RepositoryCommonSettingType,
  RepositoryCommonSettingValidator,
  RepositoryCommonSettingValidatorConfig
} from '@pimp-my-pr/shared/domain';

export class MaxTimePrWaitingSettingEntity extends SettingEntity {
  static DEFAULT_VALUE = 10;
  static Type: RepositoryCommonSettingType = 'maxSumTimeForPR';

  constructor(userId: string) {
    super(
      MaxTimePrWaitingSettingEntity.Type,
      MaxTimePrWaitingSettingEntity.DEFAULT_VALUE,
      'time',
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
