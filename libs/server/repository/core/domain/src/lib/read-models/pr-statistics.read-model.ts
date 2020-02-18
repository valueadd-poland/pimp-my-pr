import { BasePrWithChangesReadModel } from './base-pr-with-changes.read-model';
import { PrDetailsModel } from '../entities/pr-details.model';
import { PrAuthor } from '../interfaces/pr-author.interface';
import { PrChanges } from '../interfaces/pr-changes.interface';
import { PrReviewer } from '../interfaces/pr-reviewer.interface';

export class PrStatisticsReadModel extends BasePrWithChangesReadModel {
  id: number;
  title: string;
  author: PrAuthor;
  reviewCommentsCount: number;
  commentsCount: number;
  url: string;
  timeWaiting: number;
  reviewers: PrReviewer[];

  constructor(pr: PrDetailsModel, prChanges: PrChanges) {
    super(pr, prChanges);
    this.id = pr.id;
    this.title = pr.title;
    this.author = {
      avatarUrl: pr.user.avatarUrl,
      id: pr.user.id,
      name: pr.user.name
    };
    this.commentsCount = pr.commentsCount;
    this.reviewCommentsCount = pr.reviewCommentsCount;
    this.url = pr.url;
    this.timeWaiting = this.getTimePrWaiting(pr);
  }

  private getTimePrWaiting(pr: PrDetailsModel): number {
    let result: number;
    const now = new Date();
    result = (now.getTime() - pr.createdAt.getTime()) / (60 * 60 * 1000);

    return Math.round(result);
  }
}
