import { BitbucketUserEntity } from '../domain/entities/bitbucket-user.entity';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { plainToClass } from '@marcj/marshal';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

export const mapBitbucketUser = (param: BitbucketUserEntity): ReviewerEntity =>
  plainToClass(ReviewerEntity, {
    id: BitbucketUuidUtil.parseFrom(param.uuid),
    name: param.display_name,
    avatarUrl: param.links.avatar.href
  });
