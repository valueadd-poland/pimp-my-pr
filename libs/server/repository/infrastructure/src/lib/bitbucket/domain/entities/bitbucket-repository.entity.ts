import { HalResource } from '@pimp-my-pr/shared/domain';
import { BitbucketRepositoryOwnerEntity } from './bitbucket-repository-owner.entity';

export interface BitbucketRepositoryEntity
  extends HalResource<{}, 'avatar' | 'pullrequests' | 'commits'> {
  description: string;
  full_name: string;
  is_private: boolean;
  name: string;
  owner: BitbucketRepositoryOwnerEntity;
  slug: string;
  uuid: string;
}
