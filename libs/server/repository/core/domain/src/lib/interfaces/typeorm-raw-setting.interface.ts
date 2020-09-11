import {
  RepositoryCommonSettingDataType,
  RepositoryCommonSettingType
} from '@pimp-my-pr/shared/domain';

export interface TypeormRawSetting {
  setting_id: string;
  setting_settingType: RepositoryCommonSettingType;
  setting_value: string;
  setting_type: RepositoryCommonSettingDataType;
  setting_userId: string;
}
