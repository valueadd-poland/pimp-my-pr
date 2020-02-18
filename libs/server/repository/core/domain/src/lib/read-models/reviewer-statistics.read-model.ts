import { ReviewerEntity } from '../entities/reviewer.entity';
import { RepositoryPrsStatisticsReadModel } from './repository-prs-statistics.read-model';

export class ReviewerStatisticsReadModel extends ReviewerEntity {
  repositories: RepositoryPrsStatisticsReadModel[];

  constructor(user: ReviewerEntity, repositories: RepositoryPrsStatisticsReadModel[]) {
    super();
    this.name = user.name;
    this.id = user.id;
    this.contributions = user.contributions;
    this.avatarUrl = user.avatarUrl;
    this.repositories = repositories;
  }
}
