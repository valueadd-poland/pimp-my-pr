import { plainToClass } from '@marcj/marshal';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketUuidUtil } from '@pimp-my-pr/server/shared/util-bitbucket';
import { BitbucketParticipantUserEntity } from '../domain/entities/bitbucket-participant-user.entity';

export const mapBitbucketParticipantUser = (
  param: BitbucketParticipantUserEntity
): ReviewerEntity =>
  plainToClass(ReviewerEntity, {
    name: param.display_name,
    id: BitbucketUuidUtil.parseFrom(param.uuid),
    avatarUrl: param.links.avatar.href
  });
