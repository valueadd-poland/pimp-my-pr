import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ContributorRepository,
  PrRepository,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { repositoryPrsStatisticsReadModelFactory } from '../../read-models/factories/repository-prs-statistics-read-model.factory';
import { GetReviewerStatisticsQuery } from './get-reviewer-statistics.query';
import { ReviewerStatisticsReadModel } from './reviewer-statistics.read-model';

@QueryHandler(GetReviewerStatisticsQuery)
export class GetReviewerStatisticsHandler
  implements IQueryHandler<GetReviewerStatisticsQuery, ReviewerStatisticsReadModel> {
  constructor(
    private prRepository: PrRepository,
    private contributorRepository: ContributorRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(query: GetReviewerStatisticsQuery): Promise<ReviewerStatisticsReadModel> {
    const repositories = await this.repositoryRepository.findByUserId(query.userId);
    const reviewer = await this.contributorRepository.get(query.reviewerId);

    const repositoryStatistics = await Promise.all(
      repositories.map(repository =>
        this.prRepository
          .findByRepositoryId(repository.id)
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
