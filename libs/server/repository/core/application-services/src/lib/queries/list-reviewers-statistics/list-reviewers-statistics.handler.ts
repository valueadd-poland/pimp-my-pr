import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PrEntity, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  prRepositoryFactoryToken,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { ReviewerModelWithPr } from '../../read-models/reviewer-model-with-pr.interface';
import { ListReviewersStatisticsQuery } from './list-reviewers-statistics.query';
import { ReviewersStatisticsItemReadModel } from './reviewers-statistics-item-read.model';

@QueryHandler(ListReviewersStatisticsQuery)
export class ListReviewersStatisticsHandler
  implements IQueryHandler<ListReviewersStatisticsQuery, ReviewersStatisticsItemReadModel[]> {
  constructor(
    @Inject(prRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => PrRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(query: ListReviewersStatisticsQuery): Promise<ReviewersStatisticsItemReadModel[]> {
    const prRepository = this.prRepositoryFactory(query.platform);

    const repositories = await this.repositoryRepository.findByUserId(query.userId);
    const result = await Promise.all(
      repositories.map(repository =>
        prRepository
          .findByRepositoryId(repository.fullName, query.token)
          .then(prs => this.groupByReviewers(prs))
          .then(repositoryReviewersWithPrs =>
            repositoryReviewersWithPrs.map(
              reviewerWithPrs =>
                new ReviewersStatisticsItemReadModel(reviewerWithPrs.reviewer, reviewerWithPrs.prs)
            )
          )
      )
    );

    return result.flatMap<ReviewersStatisticsItemReadModel>(res => res);
  }

  private groupByReviewers(prs: PrEntity[]): ReviewerModelWithPr[] {
    const result: { [id: string]: { reviewer: ReviewerEntity; prs: PrEntity[] } } = {};

    prs.forEach(pr =>
      pr.reviewers.forEach(reviewer => {
        result[reviewer.id] = {
          reviewer,
          prs: result[reviewer.id] ? result[reviewer.id].prs.concat(pr) : [pr]
        };
      })
    );

    return Object.keys(result).map(key => ({
      reviewer: result[key].reviewer,
      prs: result[key].prs
    }));
  }
}
