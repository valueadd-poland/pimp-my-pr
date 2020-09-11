import {
  RepositoryCommonSettingDataType,
  RepositoryCommonSettingValidator,
  RepositoryCommonSettingValidatorConfig,
  RepositoryCommonSettingValueDataType
} from '@pimp-my-pr/shared/domain';

export interface SettingModel {
  id: string;
  key: string;
  value: RepositoryCommonSettingValueDataType;
  type: RepositoryCommonSettingDataType;
  validators: RepositoryCommonSettingValidatorConfig[];
}
