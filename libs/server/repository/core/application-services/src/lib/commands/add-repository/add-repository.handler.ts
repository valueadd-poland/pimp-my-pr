import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  getOwnerFromFullRepoName,
  getRepoNameFromFullRepoName,
  RepositoryAlreadyExists,
  RepositoryEntity
} from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { AddRepositoryCommand } from './add-repository.command';

@CommandHandler(AddRepositoryCommand)
export class AddRepositoryHandler implements ICommandHandler<AddRepositoryCommand> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(command: AddRepositoryCommand): Promise<void> {
    const { repositoryName, maxLines, maxWaitingTime, userId, maxPrs } = command;
    if (
      await this.repositoryRepository.getByData(
        userId,
        getRepoNameFromFullRepoName(repositoryName),
        getOwnerFromFullRepoName(repositoryName)
      )
    ) {
      throw new RepositoryAlreadyExists(repositoryName);
    }

    const repositoryData = {
      ...(await this.repositoryRepository.loadRepositoryByName(
        repositoryName,
        command.token,
        command.platform
      ))
    };

    const repository = new RepositoryEntity(
      repositoryData.id,
      repositoryData.name,
      repositoryData.owner,
      repositoryData.pictureUrl,
      command.userId,
      maxLines,
      maxWaitingTime,
      maxPrs
    );

    return this.repositoryRepository.save(repository);
  }
}
