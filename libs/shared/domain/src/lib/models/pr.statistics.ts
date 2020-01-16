import { PrAuthor } from '../interfaces/pr-author.interface';

export interface PrStatistics {
  createdAt: string;
  title: string;
  timeWaiting: string;
  id: number;
  linesOfCodeToCheck: number;
  author: PrAuthor;
  commentsCount: number;
  reviewCommentsCount: number;
  url: string;
}
