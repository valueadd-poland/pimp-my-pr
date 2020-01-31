import { BaseRepositoryModel } from '../models/base-repository.model';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

export class RepositoryPrsStatisticsReadModel extends BaseRepositoryModel {
  prsStatistics: PrStatistics[];
}
