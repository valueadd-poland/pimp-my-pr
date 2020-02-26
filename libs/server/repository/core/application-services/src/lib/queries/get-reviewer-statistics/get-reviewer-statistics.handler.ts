import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReviewerStatisticsQuery } from './get-reviewer-statistics.query';
import {
  PrRepository,
  RepositoryRepository,
  ReviewerRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { ReviewerStatisticsReadModel } from './reviewer-statistics.read-model';
import { repositoryPrsStatisticsReadModelFactory } from '../../read-models/factories/repository-prs-statistics-read-model.factory';

@QueryHandler(GetReviewerStatisticsQuery)
export class GetReviewerStatisticsHandler
  implements IQueryHandler<GetReviewerStatisticsQuery, ReviewerStatisticsReadModel> {
  constructor(
    private prRepository: PrRepository,
    private repositoryRepository: RepositoryRepository,
    private reviewerRepository: ReviewerRepository
  ) {}

  async execute(query: GetReviewerStatisticsQuery): Promise<ReviewerStatisticsReadModel> {
    const repositories = await this.repositoryRepository.findAll();

    const reviewer = await this.reviewerRepository.get(query.payload.username);
    const repositoryStatistics = await Promise.all(
      repositories.map(repository =>
        this.prRepository
          .findByRepository(repository.fullName)
          .then(prs => {
            return Promise.all(
              prs.filter(pr => pr.reviewers.some(rev => rev.name === query.payload.username))
            );
          })
          .then(pr => repositoryPrsStatisticsReadModelFactory(repository, pr))
      )
    );

    return new ReviewerStatisticsReadModel(reviewer, repositoryStatistics);
  }
}
