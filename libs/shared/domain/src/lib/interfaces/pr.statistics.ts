import { PrAuthor } from '../interfaces/pr-author.interface';

export interface PrStatistics {
  id: number;
  createdAt: string;
  title: string;
  timeWaiting: string;
  linesOfCodeToCheck: number;
  author: PrAuthor;
  commentsCount: number;
  reviewCommentsCount: number;
  url: string;
}
