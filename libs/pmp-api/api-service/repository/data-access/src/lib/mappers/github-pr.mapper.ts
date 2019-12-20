import { PrModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { Mapper } from '@pimp-my-pr/pmp-api/shared/domain';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { GithubUserMapper } from './github-user.mapper';
import { NotImplementedException } from '@nestjs/common';

export class GithubPrMapper implements Mapper<GithubPrEntity, PrModel> {
  userMapper = new GithubUserMapper();

  mapFrom(param: GithubPrEntity): PrModel {
    return {
      closedAt: new Date(param.closed_at),
      createdAt: new Date(param.created_at),
      id: param.number,
      reviewers: param.requested_reviewers.map(this.userMapper.mapFrom),
      state: param.state,
      title: param.title,
      updatedAt: new Date(param.updated_at)
    };
  }

  mapTo(param: PrModel): GithubPrEntity {
    throw new NotImplementedException(
      'Mapping to github pr format is not implemented'
    );
  }
}
