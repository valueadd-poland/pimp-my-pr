import { RepositoryCommonSettingType } from '@pimp-my-pr/shared/domain';

export const REQUIRED_USER_SETTINGS: RepositoryCommonSettingType[] = [
  'maxPendingPR',
  'maxSumTimeForPR',
  'maxTotalLines'
];
