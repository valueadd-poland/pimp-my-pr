import { ApiProperty } from '@nestjs/swagger';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { authorReadModelFactory } from './factories/author-read-model.factory';
import { AuthorReadModel } from './author.read-model';
import { ReviewerReadModel } from './reviewer.read-model';
import { reviewerReadModelFactory } from './factories/reviewer-read-model.factory';
import { getTimeDiffInHours } from '@pimp-my-pr/shared/util-time-diff-in-hours';

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

  @ApiProperty()
  maxLinesWarning: boolean;

  @ApiProperty()
  maxWaitingTimeWarning: boolean;

  @ApiProperty({ type: [ReviewerReadModel] })
  reviewers: ReviewerReadModel[];

  @ApiProperty()
  reviewersWarning: boolean;

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
    this.reviewersWarning = this.reviewers.length === 0;
    this.url = pr.url;
    this.timeWaiting = getTimeDiffInHours(pr.createdAt);
    this.timeWaitingFromLastChange = getTimeDiffInHours(pr.updatedAt);
  }
}
