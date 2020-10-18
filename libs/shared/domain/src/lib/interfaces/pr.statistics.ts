import { PrAuthor } from './pr-author.interface';
import { PrReviewer } from './pr-reviewer.interface';

export interface PrStatistics {
  id: string;
  createdAt: Date;
  title: string;
  timeWaiting: number;
  linesOfCodeToCheck: number;
  author: PrAuthor;
  commentsCount: number;
  url: string;
  reviewers: PrReviewer[];
  reviewersWarning: boolean;
}
