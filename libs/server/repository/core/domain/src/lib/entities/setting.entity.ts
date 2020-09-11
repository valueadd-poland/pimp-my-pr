import { f } from '@marcj/marshal';
import {
  RepositoryCommonSettingEditWriteModel,
  RepositoryCommonSettingValidator,
  RepositoryCommonSettingValidatorConfig
} from '@pimp-my-pr/shared/domain';
import { RepositoryCommonSettingDataType } from '@pimp-my-pr/shared/domain';
import { RepositoryCommonSettingValueDataType } from '@pimp-my-pr/shared/domain';
import { RepositoryCommonSettingType } from '@pimp-my-pr/shared/domain';

export abstract class SettingEntity {
  @(f.primary().uuid())
  id: string;

  @f.type(String)
  settingType: RepositoryCommonSettingType;

  @f
  value: string;

  @f.type(String)
  type: RepositoryCommonSettingDataType;

  @f
  userId: string;

  get typedValue(): RepositoryCommonSettingValueDataType {
    switch (this.type) {
      case 'boolean':
        return this.value === 'true' || this.value === '1';
      case 'number':
        return Number(this.value);
      case 'string':
        return String(this.value);
      case 'time':
        return Number(this.value);
      default:
        return this.value;
    }
  }

  protected constructor(
    settingType: RepositoryCommonSettingType,
    value: RepositoryCommonSettingValueDataType,
    type: RepositoryCommonSettingDataType,
    userId: string
  ) {
    this.settingType = settingType;
    this.value = String(value);
    this.type = type;
    this.userId = userId;
  }

  edit(writeModel: RepositoryCommonSettingEditWriteModel): void {
    this.value = String(writeModel.value);
  }

  abstract validate(): boolean;

  abstract getValidators(): RepositoryCommonSettingValidatorConfig[];
}
