import { Injectable } from '@nestjs/common';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryEntity } from '../entities/repository.entity';
import { PrStatisticsWithReviewersReadModel } from '../read-models/pr-statistics-with-reviewers.read-model';
import { PrStatisticsReadModel } from '../read-models/pr-statistics.read-model';
import { RepositoryPrsStatisticsReadModel } from '../read-models/repository-prs-statistics.read-model';

@Injectable()
export class RepositoryPrsStatisticsReadModelFactory {
  create(repository: RepositoryEntity, prs: PrEntity[]): RepositoryPrsStatisticsReadModel {
    const repositoryPrsStatisticsReadModel = new RepositoryPrsStatisticsReadModel();
    repositoryPrsStatisticsReadModel.name = repository.name;
    repositoryPrsStatisticsReadModel.pictureUrl = repository.pictureUrl;
    repositoryPrsStatisticsReadModel.owner = repository.owner;
    repositoryPrsStatisticsReadModel.fullName = repository.fullName;
    repositoryPrsStatisticsReadModel.prsStatistics = prs.map(
      prDetails => new PrStatisticsReadModel(prDetails)
    );

    return repositoryPrsStatisticsReadModel;
  }

  createWithPrsReviewers(
    repository: RepositoryEntity,
    prs: PrEntity[]
  ): RepositoryPrsStatisticsReadModel {
    const repositoryPrsStatisticsReadModel = new RepositoryPrsStatisticsReadModel();
    repositoryPrsStatisticsReadModel.name = repository.name;
    repositoryPrsStatisticsReadModel.pictureUrl = repository.pictureUrl;
    repositoryPrsStatisticsReadModel.owner = repository.owner;
    repositoryPrsStatisticsReadModel.fullName = repository.fullName;
    repositoryPrsStatisticsReadModel.prsStatistics = prs.map(
      prDetails =>
        new PrStatisticsWithReviewersReadModel(
          new PrStatisticsReadModel(prDetails),
          prDetails.reviewers
        )
    );

    return repositoryPrsStatisticsReadModel;
  }
}
