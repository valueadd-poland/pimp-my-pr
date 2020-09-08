import { CoreResourceAlreadyExistsException } from '@pimp-my-pr/server/shared/domain';

export class RepositoryAlreadyExists extends CoreResourceAlreadyExistsException {
  constructor(name: string) {
    super(`Repository ${name} already exists`);
  }
}
