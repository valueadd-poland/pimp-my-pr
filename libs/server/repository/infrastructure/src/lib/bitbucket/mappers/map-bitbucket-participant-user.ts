import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketParticipantUserEntity } from '../domain/entities/bitbucket-participant-user.entity';
import { plainToClass } from '@marcj/marshal';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

export const mapBitbucketParticipantUser = (
  param: BitbucketParticipantUserEntity
): ReviewerEntity =>
  plainToClass(ReviewerEntity, {
    name: param.display_name,
    id: BitbucketUuidUtil.parseFrom(param.uuid),
    avatarUrl: param.links.avatar.href
  });
