import { PrAuthor } from '../interfaces/pr-author.interface';

export interface PrStatistics {
  id: number;
  createdAt: Date;
  title: string;
  timeWaiting: number;
  linesOfCodeToCheck: number;
  author: PrAuthor;
  commentsCount: number;
  reviewCommentsCount: number;
  url: string;
}
