import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  PrRepository,
  prRepositoryFactoryToken,
  RepositoryRepository,
  ReviewerRepository,
  reviewerRepositoryFactoryToken
} from '@pimp-my-pr/server/repository/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { repositoryPrsStatisticsReadModelFactory } from '../../read-models/factories/repository-prs-statistics-read-model.factory';
import { GetReviewerStatisticsQuery } from './get-reviewer-statistics.query';
import { ReviewerStatisticsReadModel } from './reviewer-statistics.read-model';

@QueryHandler(GetReviewerStatisticsQuery)
export class GetReviewerStatisticsHandler
  implements IQueryHandler<GetReviewerStatisticsQuery, ReviewerStatisticsReadModel> {
  constructor(
    @Inject(prRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => PrRepository,
    @Inject(reviewerRepositoryFactoryToken)
    private reviewerRepositoryFactory: (platform: Platform) => ReviewerRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(query: GetReviewerStatisticsQuery): Promise<ReviewerStatisticsReadModel> {
    const prRepository = this.prRepositoryFactory(query.platform);
    const reviewerRepository = this.reviewerRepositoryFactory(query.platform);

    const repositories = await this.repositoryRepository.findByUserId(query.userId);
    const reviewer = await reviewerRepository.get(query.reviewerId, query.token);

    const repositoryStatistics = await Promise.all(
      repositories.map(repository =>
        prRepository
          .findByRepositoryId(repository.fullName, query.token)
          .then(prs => prs.filter(pr => pr.reviewers.some(rev => rev.id === query.reviewerId)))
          .then(pr => {
            if (pr.length > 0) {
              return repositoryPrsStatisticsReadModelFactory(repository, pr);
            }
          })
      )
    ).then(repositoriesList => repositoriesList.filter(Boolean));

    return new ReviewerStatisticsReadModel(reviewer, repositoryStatistics);
  }
}
