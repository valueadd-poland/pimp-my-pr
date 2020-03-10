import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { plainToClass } from '@marcj/marshal';
import { BitbucketAccountEntity } from '../domain/entities/bitbucket-account.entity';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

export const mapBitbucketAccount = (param: BitbucketAccountEntity): ReviewerEntity =>
  plainToClass(ReviewerEntity, {
    name: param.username,
    id: BitbucketUuidUtil.parseFrom(param.uuid),
    avatarUrl: param.links.avatar.href
  });
