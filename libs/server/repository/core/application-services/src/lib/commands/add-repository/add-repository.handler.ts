import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  getOwnerFromFullRepoName,
  getRepoNameFromFullRepoName,
  PrChangedWebHookCreator,
  RepositoryAlreadyExists,
  RepositoryEntity
} from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { AddRepositoryCommand } from './add-repository.command';

@CommandHandler(AddRepositoryCommand)
export class AddRepositoryHandler implements ICommandHandler<AddRepositoryCommand> {
  constructor(
    private repositoryRepository: RepositoryRepository,
    private prChangedWebHookCreator: PrChangedWebHookCreator,
    private publisher: EventPublisher
  ) {}

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

    const prChangedWebHookCreator = this.prChangedWebHookCreator;
    const repository = this.publisher.mergeObjectContext(
      await RepositoryEntity.add(
        repositoryData.id,
        repositoryData.name,
        repositoryData.owner,
        repositoryData.pictureUrl,
        command.userId,
        {
          create(repo: RepositoryEntity): Promise<void> {
            return prChangedWebHookCreator.create(repo, command.token);
          }
        },
        maxLines,
        maxWaitingTime,
        maxPrs
      )
    );

    await this.repositoryRepository.save(repository);
    repository.commit();
  }
}
