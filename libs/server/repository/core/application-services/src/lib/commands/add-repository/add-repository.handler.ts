import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { AddRepositoryCommand } from './add-repository.command';

@CommandHandler(AddRepositoryCommand)
export class AddRepositoryHandler implements ICommandHandler<AddRepositoryCommand> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(command: AddRepositoryCommand): Promise<void> {
    const { repositoryName, maxLines, maxWaitingTime } = command;

    const repository = await this.repositoryRepository.getSingleRepositoryByName(repositoryName);

    repository.maxLines = maxLines;
    repository.maxWaitingTime = maxWaitingTime;

    return this.repositoryRepository.save(repository);
  }
}
