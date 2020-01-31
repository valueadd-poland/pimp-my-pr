import { Injectable } from '@nestjs/common';
import { PrDetailsModel } from '../models/pr-details.model';
import { RepositoryModel } from '../models/repository.model';
import { RepositoryPrsStatisticsReadModel } from '../read-models/repository-prs-statistics.read-model';
import { PrStatisticsReadModel } from '../read-models/pr-statistics.read-model';
import { PrStatisticsWithReviewersReadModel } from '../read-models/pr-statistics-with-reviewers.read-model';

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

  createWithPrsReviewers(
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
        new PrStatisticsWithReviewersReadModel(
          new PrStatisticsReadModel(prDetails, {
            additions: prDetails.additions,
            changes: prDetails.changedFiles,
            deletions: prDetails.deletions
          }),
          prDetails.reviewers
        )
    );

    return repositoryPrsStatisticsReadModel;
  }
}
