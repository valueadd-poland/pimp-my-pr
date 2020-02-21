import { NotImplementedException } from '@nestjs/common';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { Mapper } from '@pimp-my-pr/server/shared/domain';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { GithubUserMapper } from './github-user.mapper';

export class GithubPrMapper implements Mapper<GithubPrEntity, PrEntity> {
  userMapper = new GithubUserMapper();

  mapFrom(param: GithubPrDetailsEntity): PrEntity {
    const pr = new PrEntity();
    pr.closedAt = new Date(param.closed_at);
    pr.createdAt = new Date(param.created_at);
    pr.url = param.html_url;
    pr.id = param.number;
    pr.reviewers = param.requested_reviewers.map(this.userMapper.mapFrom);
    pr.state = param.state;
    pr.title = param.title;
    pr.updatedAt = new Date(param.updated_at);
    pr.author = this.userMapper.mapFrom(param.user);
    pr.commentsCount = param.comments;
    pr.reviewCommentsCount = param.review_comments;
    pr.additions = param.additions;
    pr.deletions = param.deletions;
    pr.changedFiles = param.changed_files;
    return pr;
  }

  mapTo(param: PrEntity): GithubPrEntity {
    throw new NotImplementedException('Mapping to github pr format is not implemented');
  }
}
