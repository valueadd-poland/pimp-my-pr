import { RepositoryCommonSettingValueDataType } from '@pimp-my-pr/shared/domain';

export interface SettingPatch {
  id: string;
  value: RepositoryCommonSettingValueDataType;
}
