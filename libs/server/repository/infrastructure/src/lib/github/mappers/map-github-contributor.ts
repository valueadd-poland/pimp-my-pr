import { plainToClass } from '@marcj/marshal';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GithubUserEntity } from '../domain/entities/github-user.entity';

export const mapGithubContributor = (param: GithubUserEntity): ReviewerEntity =>
  plainToClass(ReviewerEntity, {
    name: param.login,
    id: `${param.id}`,
    avatarUrl: param.avatar_url,
    contributions: param.contributions
  });
