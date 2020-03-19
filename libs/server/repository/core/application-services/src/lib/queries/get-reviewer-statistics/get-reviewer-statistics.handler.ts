import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  PrRepository,
  RepositoryRepository,
  ReviewerRepository,
  prRepositoryFactoryToken,
  reviewerRepositoryFactoryToken
} from '@pimp-my-pr/server/repository/core/domain-services';
import { repositoryPrsStatisticsReadModelFactory } from '../../read-models/factories/repository-prs-statistics-read-model.factory';
import { GetReviewerStatisticsQuery } from './get-reviewer-statistics.query';
import { ReviewerStatisticsReadModel } from './reviewer-statistics.read-model';
import { Inject } from '@nestjs/common';
import { Platform } from '@pimp-my-pr/shared/domain';

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

    const repositories = await this.repositoryRepository.findAll();
    const reviewer = await reviewerRepository.get(query.username, query.token);

    const repositoryStatistics = await Promise.all(
      repositories.map(repository =>
        prRepository
          .findByRepository(repository.fullName, query.token)
          .then(prs => {
            return Promise.all(
              prs.filter(pr => pr.reviewers.some(rev => rev.name === query.username))
            );
          })
          .then(pr => repositoryPrsStatisticsReadModelFactory(repository, pr))
      )
    );

    return new ReviewerStatisticsReadModel(reviewer, repositoryStatistics);
  }
}
