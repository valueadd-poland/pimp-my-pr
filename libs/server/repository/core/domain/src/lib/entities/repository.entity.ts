import { f } from '@marcj/marshal';
import { PrEntity } from './pr.entity';
import { RepositoryEditWriteModel } from '@pimp-my-pr/shared/domain';
import { PrChangedWebHookCreator } from '../ports/pr-changed-web-hook-creator.port';
import { AggregateRoot } from '@nestjs/cqrs';
import { RepositoryAddedEvent } from '../events/repository-added.event';

export class RepositoryEntity extends AggregateRoot {
  @f.primary()
  id: string;

  @f.optional()
  maxLines?: number;

  @f.optional()
  maxWaitingTime?: number;

  @f.optional()
  maxPrs?: number;

  @f
  name: string;

  @f
  owner: string;

  @f
  pictureUrl: string;

  @f.array(PrEntity)
  prs: PrEntity[] = [];

  @f
  repositoryId: string;

  userId: string;

  get fullName(): string {
    return `${this.owner}/${this.name}`;
  }

  static async add(
    repositoryId: string,
    name: string,
    owner: string,
    pictureUrl: string,
    userId: string,
    prChangesSubscriptionCreator: PrChangedWebHookCreator,
    maxLines?: number,
    maxWaitingTime?: number,
    maxPrs?: number
  ): Promise<RepositoryEntity> {
    const repo = new RepositoryEntity();
    repo.id = repositoryId + userId;
    repo.repositoryId = repositoryId;
    repo.name = name;
    repo.owner = owner;
    repo.pictureUrl = pictureUrl;
    repo.userId = userId;
    repo.maxWaitingTime = maxWaitingTime;
    repo.maxLines = maxLines;
    repo.maxPrs = maxPrs;

    await prChangesSubscriptionCreator.create(repo);
    repo.publish(new RepositoryAddedEvent(repo));
    return repo;
  }

  edit(writeModel: RepositoryEditWriteModel): void {
    this.maxLines = writeModel.maxLines;
    this.maxWaitingTime = writeModel.maxWaitingTime;
    this.maxPrs = writeModel.maxPrs;
  }
}
