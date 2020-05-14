import { HalResource } from '@pimp-my-pr/shared/domain';

export interface BitbucketRepositoryOwnerEntity extends HalResource<{}, 'avatar' | 'self'> {
  username?: string;
  nickname?: string;
  display_name: string;
  type: 'team';
  uuid: string;
}
