import { PrEntity, RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrStatisticsReadModel } from '../pr-statistics.read-model';
import { RepositoryStatisticsReadModel } from '../../queries/get-repository-statistics/repository-statistics.read-model';

export const repositoryPrsStatisticsReadModelFactory = (
  repository: RepositoryEntity,
  prs: PrEntity[]
): RepositoryStatisticsReadModel => {
  const repositoryPrsStatisticsReadModel = new RepositoryStatisticsReadModel();
  repositoryPrsStatisticsReadModel.name = repository.name;
  repositoryPrsStatisticsReadModel.pictureUrl = repository.pictureUrl;
  repositoryPrsStatisticsReadModel.owner = repository.owner;
  repositoryPrsStatisticsReadModel.fullName = repository.fullName;
  repositoryPrsStatisticsReadModel.prsStatistics = prs.map(
    prDetails => new PrStatisticsReadModel(prDetails)
  );

  return repositoryPrsStatisticsReadModel;
};
