import { UserModel } from '../models/user.model';
import { RepositoryPrsStatisticsReadModel } from './repository-prs-statistics.read-model';

export class ReviewerStatisticsReadModel extends UserModel {
  repositories: RepositoryPrsStatisticsReadModel[];

  constructor(user: UserModel, repositories: RepositoryPrsStatisticsReadModel[]) {
    super();
    this.name = user.name;
    this.id = user.id;
    this.contributions = user.contributions;
    this.avatarUrl = user.avatarUrl;
    this.repositories = repositories;
  }
}
