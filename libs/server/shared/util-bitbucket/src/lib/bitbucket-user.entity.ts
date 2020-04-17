import { HalResource } from '@pimp-my-pr/shared/domain';

export interface BitbucketUserEntity
  extends HalResource<{}, 'avatar' | 'repositories' | 'html' | 'self'> {
  username: string;
  nickname: string;
  uuid: string;
  display_name: string;
  created_on: string;
}
