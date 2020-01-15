import { BaseRepositoryStatisticsReadModel } from './base-repository-statistics.read-model';
import { PrWithChangesReadModel } from './pr-with-changes.read-model';
import { UserModel } from '../models';

export class RepositoryUserStatisticsReadModel extends BaseRepositoryStatisticsReadModel {
  id: number;

  constructor(userModel: UserModel, prsModel: PrWithChangesReadModel[]) {
    super(userModel, prsModel);
    this.id = userModel.id;
  }
}
