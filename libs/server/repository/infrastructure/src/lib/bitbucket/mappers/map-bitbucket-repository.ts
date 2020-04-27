import { plainToClass } from '@marcj/marshal';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketUuidUtil } from '@pimp-my-pr/server/shared/util-bitbucket';
import { BitbucketRepositoryEntity } from '../domain/entities/bitbucket-repository.entity';

export const mapBitbucketRepository = (repo: BitbucketRepositoryEntity) =>
  plainToClass(RepositoryEntity, {
    displayName: repo.name,
    id: BitbucketUuidUtil.parseFrom(repo.uuid),
    name: repo.slug,
    owner: repo.owner.username,
    pictureUrl: repo.links.avatar.href
  });
