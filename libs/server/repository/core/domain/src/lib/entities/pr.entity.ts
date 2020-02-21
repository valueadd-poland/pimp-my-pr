import { ReviewerEntity } from './reviewer.entity';
import { AuthorEntity } from './author.entity';

export class PrEntity {
  additions: number;
  author: AuthorEntity;
  changedFiles: number;
  closedAt: Date;
  commentsCount: number;
  createdAt: Date;
  deletions: number;
  id: number;
  reviewCommentsCount: number;
  reviewers: ReviewerEntity[];
  state: 'open' | 'closed';
  title: string;
  updatedAt: Date;
  url: string;

  get linesOfCodeToCheck(): number {
    return this.additions + this.deletions;
  }
}
