import { ApiProperty } from '@nestjs/swagger';
import {
  PrEntity,
  RepositoryEntity,
  ReviewerEntity
} from '@pimp-my-pr/server/repository/core/domain';

export abstract class BaseStatisticsReadModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  linesOfCodeToCheck: number;

  @ApiProperty()
  longestPrLinesOfCode?: number;

  @ApiProperty()
  maxLinesWarning: boolean;

  @ApiProperty()
  maxWaitingTimeWarning: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  pendingPrs: number;

  @ApiProperty()
  sumOfHoursPrsWaiting?: number;
  @ApiProperty()
  reviewersCount: number;
  @ApiProperty()
  averagePrWaiting: number;
  @ApiProperty()
  averageCodeToCheck: number;
  @ApiProperty()
  longestWaitingPr: number;

  protected constructor(model: RepositoryEntity | ReviewerEntity, prs: PrEntity[]) {
    const sumOfHoursPrsWaiting = this.getSumOfHoursPrsWaiting(prs);
    const linesOfCodeToCheck = this.getLinesOfCodeToCheck(prs);

    this.id = model.id;
    this.name = model.name;
    this.pendingPrs = prs.length;
    this.sumOfHoursPrsWaiting = sumOfHoursPrsWaiting;
    this.linesOfCodeToCheck = linesOfCodeToCheck;
    this.longestPrLinesOfCode = this.getLongestPrLinesOfCode(prs);
    this.reviewersCount = this.getReviewersCount(prs);
    this.averagePrWaiting = this.getAveragePrWaiting(prs, sumOfHoursPrsWaiting);
    this.averageCodeToCheck = this.getAverageCodeToCheck(prs, linesOfCodeToCheck);
    this.longestWaitingPr = this.getLongestWaitingPr(prs);
  }

  private getLongestPrLinesOfCode(prs: PrEntity[]): number {
    return prs.length
      ? prs.reduce((prev, current) => {
          return prev.linesOfCodeToCheck > current.linesOfCodeToCheck ? prev : current;
        }).linesOfCodeToCheck
      : 0;
  }

  private getLinesOfCodeToCheck(prs: PrEntity[]): number {
    return prs.length ? prs.reduce((a, b) => a + b.linesOfCodeToCheck, 0) : 0;
  }

  private getSumOfHoursPrsWaiting(prs: PrEntity[]): number {
    const now = new Date();
    return Math.round(
      prs.reduce((sum, pr) => sum + (now.getTime() - pr.createdAt.getTime()) / (60 * 60 * 1000), 0)
    );
  }

  private getLongestWaitingPr(prs: PrEntity[]): number {
    let max = 0;
    const now = new Date();
    prs.forEach(pr => {
      const newTime = (now.getTime() - pr.createdAt.getTime()) / (60 * 60 * 1000);
      if (newTime > max) {
        max = newTime;
      }
    });
    return Math.round(max);
  }

  private getReviewersCount(prs: PrEntity[]): number {
    const prAuthorsIds = prs.map(x => x.author.id);
    return [...new Set(prAuthorsIds)].length;
  }

  private getAveragePrWaiting(prs: PrEntity[], sumOfHoursPrsWaiting: number): number {
    return prs.length > 0 ? Math.round(sumOfHoursPrsWaiting / prs.length) : 0;
  }

  private getAverageCodeToCheck(prs: PrEntity[], linesOfCodeToCheck: number): number {
    return prs.length > 0 ? Math.round(linesOfCodeToCheck / prs.length) : 0;
  }
}
