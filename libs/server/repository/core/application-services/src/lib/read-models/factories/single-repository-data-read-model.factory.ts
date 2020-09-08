import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { ListRepositoriesReadModel } from '@pimp-my-pr/server/repository/core/application-services';
import { SingleRepositoryDataReadModel } from '../../queries/get-single-repository-data/single-repository-data.read-model';

export const singleRepositoryDataReadModelFactory = (
  repository: RepositoryEntity
): ListRepositoriesReadModel => {
  const singleRepositoryReadModel = new SingleRepositoryDataReadModel();

  singleRepositoryReadModel.id = repository.id;
  singleRepositoryReadModel.maxLines = repository.maxLines;
  singleRepositoryReadModel.maxWaitingTime = repository.maxWaitingTime;
  singleRepositoryReadModel.name = repository.name;
  singleRepositoryReadModel.owner = repository.owner;
  singleRepositoryReadModel.pictureUrl = repository.pictureUrl;
  singleRepositoryReadModel.repositoryId = repository.repositoryId;

  return singleRepositoryReadModel;
};
