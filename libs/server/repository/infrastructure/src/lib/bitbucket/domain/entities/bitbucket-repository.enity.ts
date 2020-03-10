import { HalResource } from '@pimp-my-pr/shared/domain';
import { BitbucketRepositoryOwnerEntity } from './bitbucket-repository-owner.entity';

export interface BitbucketRepositoryEnity
  extends HalResource<{}, 'avatar' | 'pullrequests' | 'commits'> {
  uuid: string;
  name: string;
  description: string;
  full_name: string;
  is_private: boolean;
  owner: BitbucketRepositoryOwnerEntity;
}
