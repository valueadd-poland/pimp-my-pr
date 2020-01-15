import { PrStatisticsReadModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { BaseRepositoryModel } from '../models/base-repository.model';

export class RepositoryPrsStatisticsReadModel extends BaseRepositoryModel {
  prsStatistics: PrStatisticsReadModel[];
}
