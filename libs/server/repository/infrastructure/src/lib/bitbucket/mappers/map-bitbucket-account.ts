import { plainToClass } from '@marcj/marshal';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketUuidUtil } from '@pimp-my-pr/server/shared/util-bitbucket';
import { BitbucketAccountEntity } from '../domain/entities/bitbucket-account.entity';

export const mapBitbucketAccount = (param: BitbucketAccountEntity): ReviewerEntity =>
  plainToClass(ReviewerEntity, {
    name: param.username,
    id: BitbucketUuidUtil.parseFrom(param.uuid),
    avatarUrl: param.links.avatar.href
  });
