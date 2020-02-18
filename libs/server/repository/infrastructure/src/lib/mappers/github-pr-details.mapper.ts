import { Mapper } from '@pimp-my-pr/server/shared/domain';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { PrDetailsModel } from '@pimp-my-pr/server/repository/core/domain';
import { GithubPrMapper } from './github-pr.mapper';
import { NotImplementedException } from '@nestjs/common';

export class GithubPrDetailsMapper extends GithubPrMapper
  implements Mapper<GithubPrDetailsEntity, PrDetailsModel> {
  mapFrom(param: GithubPrDetailsEntity): PrDetailsModel {
    return {
      ...super.mapFrom(param),
      commentsCount: param.comments,
      reviewCommentsCount: param.review_comments,
      additions: param.additions,
      deletions: param.deletions,
      url: param.html_url,
      changedFiles: param.changed_files
    };
  }

  mapTo(param: PrDetailsModel): GithubPrDetailsEntity {
    throw new NotImplementedException('Mapping to github pr details format is not implemented');
  }
}
