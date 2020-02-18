import { CoreNotFoundException } from '@pimp-my-pr/server/shared/domain';

export class RepositoryNotFoundException extends CoreNotFoundException {
  constructor(repositoryName: string) {
    super(`Repository ${repositoryName} not found`);
  }
}
