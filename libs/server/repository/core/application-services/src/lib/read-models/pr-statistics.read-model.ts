import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrAuthor } from './interfaces/pr-author.interface';
import { PrReviewer } from './interfaces/pr-reviewer.interface';

export class PrStatisticsReadModel {
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

  constructor(pr: PrEntity) {
    this.createdAt = pr.createdAt;
    this.linesOfCodeToCheck = pr.linesOfCodeToCheck;
    this.id = pr.id;
    this.title = pr.title;
    this.author = {
      avatarUrl: pr.author.avatarUrl,
      id: pr.author.id,
      name: pr.author.name
    };
    this.commentsCount = pr.commentsCount;
    this.reviewers = pr.reviewers;
    this.reviewCommentsCount = pr.reviewCommentsCount;
    this.url = pr.url;
    this.timeWaiting = this.getTimePrWaiting(pr);
  }

  private getTimePrWaiting(pr: PrEntity): number {
    let result: number;
    const now = new Date();
    result = (now.getTime() - pr.createdAt.getTime()) / (60 * 60 * 1000);

    return Math.round(result);
  }
}
