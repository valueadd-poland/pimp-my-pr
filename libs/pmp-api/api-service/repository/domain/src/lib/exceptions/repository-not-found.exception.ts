import { CoreNotFoundException } from '@pimp-my-pr/pmp-api/shared/domain';

export class RepositoryNotFoundException extends CoreNotFoundException {
  constructor(repositoryName: string) {
    super(`Repository ${repositoryName} not found`);
  }
}
