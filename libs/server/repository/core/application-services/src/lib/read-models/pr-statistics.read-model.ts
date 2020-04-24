import { ApiProperty } from '@nestjs/swagger';
import { AuthorEntity, PrEntity, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';

export class PrStatisticsReadModel {
  @ApiProperty()
  author: AuthorEntity;
  @ApiProperty()
  commentsCount: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  id: string;
  @ApiProperty()
  linesOfCodeToCheck: number;
  @ApiProperty({ type: [ReviewerEntity] })
  reviewers: ReviewerEntity[];
  @ApiProperty()
  timeWaiting: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  url: string;

  constructor(pr: PrEntity) {
    this.createdAt = pr.createdAt;
    this.linesOfCodeToCheck = pr.linesOfCodeToCheck;
    this.id = pr.id;
    this.title = pr.title;
    this.author = pr.author;
    this.commentsCount = pr.commentsCount;
    this.reviewers = pr.reviewers;
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
