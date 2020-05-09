import { AuthorEntity } from '@pimp-my-pr/server/repository/core/domain';
import { AuthorReadModel } from '../author.read-model';

export const authorReadModelFactory = (authorEntity: AuthorEntity): AuthorReadModel => {
  const authorReadModel = new AuthorReadModel();

  authorReadModel.id = authorEntity.id;
  authorReadModel.name = authorEntity.name;
  authorReadModel.avatarUrl = authorEntity.avatarUrl;

  return authorReadModel;
};
