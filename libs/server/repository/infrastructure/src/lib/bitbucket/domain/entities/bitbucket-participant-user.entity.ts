import { HalResource } from '@pimp-my-pr/shared/domain';

export interface BitbucketParticipantUserEntity extends HalResource<{}, 'avatar' | 'self'> {
  account_id: string;
  uuid: string;
  nickname: string;
  display_name: string;
}
