import {
  PrDetailsModel,
  PrStatisticsReadModel,
  RepositoryModel,
  RepositoryPrsStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryPrsStatisticsReadModelFactory {
  create(
    repository: RepositoryModel,
    prsDetails: PrDetailsModel[]
  ): RepositoryPrsStatisticsReadModel {
    const repositoryPrsStatisticsReadModel = new RepositoryPrsStatisticsReadModel();
    repositoryPrsStatisticsReadModel.name = repository.name;
    repositoryPrsStatisticsReadModel.pictureUrl = repository.pictureUrl;
    repositoryPrsStatisticsReadModel.owner = repository.owner;
    repositoryPrsStatisticsReadModel.fullName = repository.fullName;
    repositoryPrsStatisticsReadModel.prsStatistics = prsDetails.map(
      prDetails =>
        new PrStatisticsReadModel(prDetails, {
          additions: prDetails.additions,
          changes: prDetails.changedFiles,
          deletions: prDetails.deletions
        })
    );

    return repositoryPrsStatisticsReadModel;
  }
}
