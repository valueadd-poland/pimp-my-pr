import { PrEntity, RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryStatisticsReadModel } from '../../queries/get-repository-statistics/repository-statistics.read-model';
import { PrStatisticsReadModel } from '../pr-statistics.read-model';

export const repositoryPrsStatisticsReadModelFactory = (
  repository: RepositoryEntity,
  prs: PrEntity[]
): RepositoryStatisticsReadModel => {
  const repositoryPrsStatisticsReadModel = new RepositoryStatisticsReadModel();

  repositoryPrsStatisticsReadModel.id = repository.id;
  repositoryPrsStatisticsReadModel.name = repository.name;
  repositoryPrsStatisticsReadModel.pictureUrl = repository.pictureUrl;
  repositoryPrsStatisticsReadModel.owner = repository.owner;
  repositoryPrsStatisticsReadModel.fullName = repository.fullName;
  repositoryPrsStatisticsReadModel.maxLines = repository.maxLines;
  repositoryPrsStatisticsReadModel.maxPrs = repository.maxPrs;
  repositoryPrsStatisticsReadModel.maxWaitingTime = repository.maxWaitingTime;

  repositoryPrsStatisticsReadModel.prsStatistics = prs.map(prDetails => {
    const prStatistics = new PrStatisticsReadModel(prDetails);

    prStatistics.maxLinesWarning =
      !!repository.maxLines && prStatistics.linesOfCodeToCheck > repository.maxLines;

    prStatistics.maxWaitingTimeWarning =
      !!repository.maxWaitingTime &&
      prStatistics.timeWaitingFromLastChange > repository.maxWaitingTime;
    return prStatistics;
  });

  return repositoryPrsStatisticsReadModel;
};
