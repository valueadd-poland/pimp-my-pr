import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

export abstract class RemoteRepositoryRepository {
  abstract getSingleRepositoryById(id: string, workspace?: string): Promise<RepositoryEntity>;

  abstract getSingleRepositoryByName(fullName: string): Promise<RepositoryEntity>;
}
