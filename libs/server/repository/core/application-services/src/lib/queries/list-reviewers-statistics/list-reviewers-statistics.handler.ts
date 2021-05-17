import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PrEntity, RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  prRepositoryFactoryToken,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { ReviewerModelWithPr } from '../../read-models/reviewer-model-with-pr.interface';
import { ListReviewersStatisticsQuery } from './list-reviewers-statistics.query';
import { ReviewersStatisticsItemReadModel } from './reviewers-statistics-item-read.model';
import { getTimeDiffInHours } from '@pimp-my-pr/shared/util-time-diff-in-hours';

@QueryHandler(ListReviewersStatisticsQuery)
export class ListReviewersStatisticsHandler
  implements IQueryHandler<ListReviewersStatisticsQuery, ReviewersStatisticsItemReadModel[]> {
  constructor(
    private prRepository: PrRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(query: ListReviewersStatisticsQuery): Promise<ReviewersStatisticsItemReadModel[]> {
    const repositories = await this.repositoryRepository.findByUserId(query.userId);

    const repositoriesPrs = new Map<RepositoryEntity, PrEntity[]>();

    const nestedPrs = await Promise.all(
      repositories.map(repository => this.prRepository.findByRepositoryId(repository.fullName))
    );

    nestedPrs.forEach((prs, index) => repositoriesPrs.set(repositories[index], prs));

    const reviewersWithPrs = this.groupPrsByReviewers(repositoriesPrs);

    return reviewersWithPrs.map(
      ({ reviewer, prs, maxLinesWarning, maxWaitingTimeWarning }) =>
        new ReviewersStatisticsItemReadModel(reviewer, prs, maxLinesWarning, maxWaitingTimeWarning)
    );
  }

  private groupPrsByReviewers(
    repositoriesPrs: Map<RepositoryEntity, PrEntity[]>
  ): ReviewerModelWithPr[] {
    const result: { [id: string]: ReviewerModelWithPr } = {};

    repositoriesPrs.forEach((repositoryPrs, repository) => {
      repositoryPrs.forEach(repositoryPr => {
        repositoryPr.reviewers.forEach(reviewer => {
          result[reviewer.id] = {
            reviewer,
            prs: result[reviewer.id]?.prs.concat(repositoryPr) || [repositoryPr],
            maxLinesWarning:
              result[reviewer.id]?.maxLinesWarning ||
              (!!repository.maxLines && repositoryPr.linesOfCodeToCheck > repository.maxLines),
            maxWaitingTimeWarning:
              result[reviewer.id]?.maxWaitingTimeWarning ||
              (!!repository.maxWaitingTime &&
                getTimeDiffInHours(repositoryPr.updatedAt) > repository.maxWaitingTime)
          };
        });
      });
    });

    return Object.values(result);
  }
}
