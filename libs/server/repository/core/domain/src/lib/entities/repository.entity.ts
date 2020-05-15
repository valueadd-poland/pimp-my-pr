import { f } from '@marcj/marshal';
import { PrEntity } from './pr.entity';
import { RepositoryEditWriteModel } from '@pimp-my-pr/shared/domain';

export class RepositoryEntity {
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

  constructor(
    repositoryId: string,
    name: string,
    owner: string,
    pictureUrl: string,
    userId: string,
    maxLines?: number,
    maxWaitingTime?: number,
    maxPrs?: number
  ) {
    this.id = repositoryId + userId;
    this.repositoryId = repositoryId;
    this.name = name;
    this.owner = owner;
    this.pictureUrl = pictureUrl;
    this.userId = userId;
    this.maxWaitingTime = maxWaitingTime;
    this.maxLines = maxLines;
    this.maxPrs = maxPrs;
  }

  edit(writeModel: RepositoryEditWriteModel): void {
    this.maxLines = writeModel.maxLines;
    this.maxWaitingTime = writeModel.maxWaitingTime;
    this.maxPrs = writeModel.maxPrs;
  }
}
