import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { Mapper } from '@pimp-my-pr/server/shared/domain';
import { GithubUserEntity } from '../domain/entities/github-user.entity';
import { NotImplementedException } from '@nestjs/common';

export class GithubUserMapper implements Mapper<GithubUserEntity, ReviewerEntity> {
  mapFrom(param: GithubUserEntity): ReviewerEntity {
    return {
      name: param.login,
      id: param.id,
      avatarUrl: param.avatar_url,
      contributions: param.contributions
    };
  }

  mapTo(param: ReviewerEntity): GithubUserEntity {
    throw new NotImplementedException('Mapping to github user format is not implemented');
  }
}
