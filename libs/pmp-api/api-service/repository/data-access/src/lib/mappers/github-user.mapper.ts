import { UserModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { Mapper } from '@pimp-my-pr/pmp-api/shared/domain';
import { GithubUserEntity } from '../domain/entities/github-user.entity';
import { NotImplementedException } from '@nestjs/common';

export class GithubUserMapper implements Mapper<GithubUserEntity, UserModel> {
  mapFrom(param: GithubUserEntity): UserModel {
    return {
      name: param.login,
      id: param.id,
      avatarUrl: param.avatar_url,
      contributions: param.contributions
    };
  }

  mapTo(param: UserModel): GithubUserEntity {
    throw new NotImplementedException('Mapping to github user format is not implemented');
  }
}
