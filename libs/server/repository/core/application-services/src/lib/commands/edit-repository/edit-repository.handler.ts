import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { EditRepositoryCommand } from './edit-repository.command';

@CommandHandler(EditRepositoryCommand)
export class EditRepositoryHandler implements ICommandHandler<EditRepositoryCommand> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(command: EditRepositoryCommand): Promise<void> {
    const { repositoryId, maxLines, maxWaitingTime, maxPrs } = command;

    const repository = await this.repositoryRepository.getById(repositoryId);

    repository.edit({ maxLines, maxWaitingTime, maxPrs });

    return this.repositoryRepository.save(repository);
  }
}
