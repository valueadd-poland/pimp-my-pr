import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { AddRepositoryCommand } from './add-repository.command';

@CommandHandler(AddRepositoryCommand)
export class AddRepositoryHandler implements ICommandHandler<AddRepositoryCommand> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(command: AddRepositoryCommand): Promise<void> {
    const repository = await this.repositoryRepository.getSingleRepositoryByName(
      command.repositoryName
    );
    return this.repositoryRepository.save(repository).then();
  }
}
