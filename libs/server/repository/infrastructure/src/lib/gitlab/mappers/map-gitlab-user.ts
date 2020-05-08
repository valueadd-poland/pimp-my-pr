import { plainToClass } from '@marcj/marshal';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GitlabUserEntity } from '../domain/entities/gitlab-user.entity';

export const mapGitlabUser = (param: GitlabUserEntity): ReviewerEntity =>
  plainToClass(ReviewerEntity, {
    name: param.username,
    id: param.id,
    avatarUrl: param.avatar_url
  });
