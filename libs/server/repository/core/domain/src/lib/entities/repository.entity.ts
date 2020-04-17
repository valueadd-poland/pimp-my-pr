import { f } from '@marcj/marshal';
import { PrEntity } from './pr.entity';

export class RepositoryEntity {
  @f.primary()
  id: string;

  @f.optional()
  maxLines?: number;

  @f.optional()
  maxWaitingTime?: number;

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
    maxWaitingTime?: number
  ) {
    this.id = repositoryId + userId;
    this.repositoryId = repositoryId;
    this.name = name;
    this.owner = owner;
    this.pictureUrl = pictureUrl;
    this.userId = userId;
    this.maxWaitingTime = maxWaitingTime;
    this.maxLines = maxLines;
  }
}
