import { ApiProperty } from '@nestjs/swagger';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { authorReadModelFactory } from './factories/author-read-model.factory';
import { AuthorReadModel } from './author.read-model';
import { ReviewerReadModel } from './reviewer.read-model';
import { reviewerReadModelFactory } from './factories/reviewer-read-model.factory';

export class PrStatisticsReadModel {
  @ApiProperty()
  author: AuthorReadModel;
  @ApiProperty()
  commentsCount: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  id: string;
  @ApiProperty()
  linesOfCodeToCheck: number;
  @ApiProperty({ type: [ReviewerReadModel] })
  reviewers: ReviewerReadModel[];
  @ApiProperty()
  timeWaiting: number;
  @ApiProperty()
  timeWaitingFromLastChange: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  url: string;

  constructor(pr: PrEntity) {
    this.createdAt = pr.createdAt;
    this.linesOfCodeToCheck = pr.linesOfCodeToCheck;
    this.id = pr.id;
    this.title = pr.title;
    this.author = authorReadModelFactory(pr.author);
    this.commentsCount = pr.commentsCount;
    this.reviewers = pr.reviewers.map(reviewer => reviewerReadModelFactory(reviewer));
    this.url = pr.url;
    this.timeWaiting = this.getTimePrWaiting(pr.createdAt);
    this.timeWaitingFromLastChange = this.getTimePrWaiting(pr.updatedAt);
  }

  private getTimePrWaiting(waitingSince: Date): number {
    let result: number;
    const now = new Date();
    result = (now.getTime() - waitingSince.getTime()) / (60 * 60 * 1000);

    return Math.round(result);
  }
}
