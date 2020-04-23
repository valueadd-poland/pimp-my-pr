import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { DeleteRepositoryCommand } from './delete-repository.command';

@CommandHandler(DeleteRepositoryCommand)
export class DeleteRepositoryHandler implements ICommandHandler<DeleteRepositoryCommand> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(command: DeleteRepositoryCommand): Promise<void> {
    const { repositoryId } = command;

    const repository = await this.repositoryRepository.getById(repositoryId);

    return this.repositoryRepository.delete(repository);
  }
}
