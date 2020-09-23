import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PrEntity, RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  prRepositoryFactoryToken,
  RepositoryRepository,
  SettingsRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { ReviewerModelWithPr } from '../../read-models/reviewer-model-with-pr.interface';
import { ListReviewersStatisticsQuery } from './list-reviewers-statistics.query';
import { ReviewersStatisticsItemReadModel } from './reviewers-statistics-item-read.model';
import { getTimeDiffInHours } from '@pimp-my-pr/shared/util-time-diff-in-hours';

@QueryHandler(ListReviewersStatisticsQuery)
export class ListReviewersStatisticsHandler
  implements IQueryHandler<ListReviewersStatisticsQuery, ReviewersStatisticsItemReadModel[]> {
  constructor(
    @Inject(prRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => PrRepository,
    private repositoryRepository: RepositoryRepository,
    private settingsRepository: SettingsRepository
  ) {}

  async execute(query: ListReviewersStatisticsQuery): Promise<ReviewersStatisticsItemReadModel[]> {
    const prRepository = this.prRepositoryFactory(query.platform);

    const repositories = await this.repositoryRepository.findByUserId(query.userId);

    const repositoriesPrs = new Map<RepositoryEntity, PrEntity[]>();

    const nestedPrs = await Promise.all(
      repositories.map(repository =>
        prRepository.findByRepositoryId(repository.fullName, query.token)
      )
    );

    nestedPrs.forEach((prs, index) => repositoriesPrs.set(repositories[index], prs));

    const maxPrsPending = await this.settingsRepository.getByUserAndType(
      query.userId,
      'maxPendingPR'
    );
    const maxTimeWaiting = await this.settingsRepository.getByUserAndType(
      query.userId,
      'maxSumTimeForPR'
    );
    const maxLinesToCheck = await this.settingsRepository.getByUserAndType(
      query.userId,
      'maxTotalLines'
    );

    const reviewersWithPrs = this.groupPrsByReviewers(repositoriesPrs);

    return reviewersWithPrs.map(
      ({ reviewer, prs }) =>
        new ReviewersStatisticsItemReadModel(
          reviewer,
          prs,
          this.getTotalPrsWarning(prs, Number(maxPrsPending.typedValue)),
          this.getMaxLinesWarning(prs, Number(maxLinesToCheck.typedValue)),
          this.getMaxWaitingTimeWarning(prs, Number(maxTimeWaiting.typedValue))
        )
    );
  }

  private groupPrsByReviewers(
    repositoriesPrs: Map<RepositoryEntity, PrEntity[]>
  ): ReviewerModelWithPr[] {
    const result: { [id: string]: ReviewerModelWithPr } = {};

    repositoriesPrs.forEach((repositoryPrs, repository) => {
      repositoryPrs.forEach(repositoryPr => {
        repositoryPr.reviewers.forEach(reviewer => {
          const prs = result[reviewer.id]?.prs.concat(repositoryPr) || [repositoryPr];
          result[reviewer.id] = {
            reviewer,
            prs: prs
          };
        });
      });
    });

    return Object.values(result);
  }

  private getTotalPrsWarning(prs: PrEntity[], limit: number): boolean {
    return prs.length > limit;
  }

  private getMaxWaitingTimeWarning(prs: PrEntity[], limit: number): boolean {
    return (
      prs.reduce((max, model) => Math.max(max, getTimeDiffInHours(model.updatedAt)), 0) > limit
    );
  }

  private getMaxLinesWarning(prs: PrEntity[], limit: number): boolean {
    return prs.reduce((max, current) => Math.max(max, current.linesOfCodeToCheck), 0) > limit;
  }
}
