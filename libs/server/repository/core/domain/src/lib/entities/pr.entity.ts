import { ReviewerEntity } from './reviewer.entity';
import { AuthorEntity } from './author.entity';
import { f } from '@marcj/marshal';

export class PrEntity {
  @f
  additions: number;
  @f
  author: AuthorEntity;
  @f
  changedFiles: number;
  @f
  closedAt: Date;
  @f
  commentsCount: number;
  @f
  createdAt: Date;
  @f
  deletions: number;
  @f
  id: number;
  @f
  reviewCommentsCount: number;
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
