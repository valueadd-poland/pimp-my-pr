import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { ListRepositoriesReadModel } from '../../queries/list-repositories/list-repositories.read-model';

export const listRepositoriesReadModelFactory = (
  repository: RepositoryEntity
): ListRepositoriesReadModel => {
  const listRepositoriesReadModel = new ListRepositoriesReadModel();

  listRepositoriesReadModel.id = repository.id;
  listRepositoriesReadModel.maxLines = repository.maxLines;
  listRepositoriesReadModel.maxWaitingTime = repository.maxWaitingTime;
  listRepositoriesReadModel.maxPrs = repository.maxPrs;
  listRepositoriesReadModel.name = repository.name;
  listRepositoriesReadModel.owner = repository.owner;
  listRepositoriesReadModel.pictureUrl = repository.pictureUrl;
  listRepositoriesReadModel.repositoryId = repository.repositoryId;

  return listRepositoriesReadModel;
};
