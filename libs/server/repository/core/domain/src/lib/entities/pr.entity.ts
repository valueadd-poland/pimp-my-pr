import { ReviewerEntity } from './reviewer.entity';

export class PrEntity {
  additions: number;
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
  user: ReviewerEntity;

  get linesOfCodeToCheck(): number {
    return this.additions + this.deletions;
  }
}
