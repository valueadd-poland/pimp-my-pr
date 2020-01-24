import { BaseRepositoryStatisticsReadModel } from './base-repository-statistics.read-model';
import { PrWithChangesReadModel } from './pr-with-changes.read-model';
import { UserModel } from '../models/user.model';

export class RepositoryUserStatisticsReadModel extends BaseRepositoryStatisticsReadModel {
  avatarUrl: string;

  constructor(userModel: UserModel, prsModel: PrWithChangesReadModel[]) {
    super(userModel, prsModel);
    this.avatarUrl = userModel.avatarUrl;
  }
}
