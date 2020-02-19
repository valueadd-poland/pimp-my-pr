import { PrStatisticsReadModel } from '@pimp-my-pr/server/repository/core/domain';
import { PrReviewer, PrStatistics } from '@pimp-my-pr/shared/domain';
import { PrAuthor } from '../interfaces/pr-author.interface';

export class PrStatisticsWithReviewersReadModel implements PrStatistics {
  author: PrAuthor;
  commentsCount: number;
  createdAt: Date;
  id: number;
  linesOfCodeToCheck: number;
  reviewCommentsCount: number;
  reviewers: PrReviewer[];
  timeWaiting: number;
  title: string;
  url: string;

  constructor(pr: PrStatisticsReadModel, reviewers: PrReviewer[]) {
    this.author = pr.author;
    this.commentsCount = pr.commentsCount;
    this.createdAt = pr.createdAt;
    this.id = pr.id;
    this.linesOfCodeToCheck = pr.linesOfCodeToCheck;
    this.reviewCommentsCount = pr.reviewCommentsCount;
    this.reviewers = reviewers;
    this.timeWaiting = pr.timeWaiting;
    this.title = pr.title;
    this.url = pr.url;
  }
}
