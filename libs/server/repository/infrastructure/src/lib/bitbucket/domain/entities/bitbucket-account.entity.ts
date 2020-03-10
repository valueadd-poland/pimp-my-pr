import { HalResource } from '@pimp-my-pr/shared/domain';

export interface BitbucketAccountEntity extends HalResource<{}, 'avatar' | 'repositories'> {
  uuid: string;
  username: string;
  nickname: string;
  account_status: string;
  display_name: string;
}
