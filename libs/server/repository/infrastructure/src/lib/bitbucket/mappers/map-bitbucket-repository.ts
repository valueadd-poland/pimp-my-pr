import { plainToClass } from '@marcj/marshal';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketRepositoryEnity } from '../domain/entities/bitbucket-repository.enity';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

export const mapBitbucketRepository = (repo: BitbucketRepositoryEnity) =>
  plainToClass(RepositoryEntity, {
    ...repo,
    fullName: repo.full_name,
    id: BitbucketUuidUtil.parseFrom(repo.uuid),
    owner: repo.owner.display_name,
    pictureUrl: repo.links.avatar.href
  });
