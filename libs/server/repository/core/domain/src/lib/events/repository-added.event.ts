import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

export class RepositoryAddedEvent {
  constructor(public repo: RepositoryEntity) {}
}
