import { f } from '@marcj/marshal';
import { AuthorEntity } from './author.entity';
import { ReviewerEntity } from './reviewer.entity';
import { ITimeTrackable } from '@pimp-my-pr/server/repository/util';

export class PrEntity implements ITimeTrackable {
  @f
  additions: number;

  @f
  author: AuthorEntity;

  @f
  changedFiles: number;

  @f.optional()
  closedAt?: Date;

  @f
  commentsCount: number;

  @f
  createdAt: Date;

  @f
  deletions: number;

  @f
  id: string;

  @f.array(ReviewerEntity)
  reviewers: ReviewerEntity[];

  @f
  state: 'open' | 'closed';

  @f
  title: string;

  @f
  updatedAt: Date;

  @f
  url: string;

  get linesOfCodeToCheck(): number {
    return this.additions + this.deletions;
  }
}
