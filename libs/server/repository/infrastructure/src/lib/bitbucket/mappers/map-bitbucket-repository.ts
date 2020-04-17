import { plainToClass } from '@marcj/marshal';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketUuidUtil } from '@pimp-my-pr/server/shared/util-bitbucket';
import { BitbucketRepositoryEnity } from '../domain/entities/bitbucket-repository.enity';

export const mapBitbucketRepository = (repo: BitbucketRepositoryEnity) =>
  plainToClass(RepositoryEntity, {
    displayName: repo.name,
    fullName: repo.full_name,
    id: BitbucketUuidUtil.parseFrom(repo.uuid),
    name: repo.slug,
    owner: repo.owner.display_name,
    pictureUrl: repo.links.avatar.href
  });
