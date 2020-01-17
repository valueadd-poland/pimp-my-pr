import {
  PrWithChangesReadModel,
  RepositoryModel,
  UserModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';

export abstract class BaseRepositoryStatisticsReadModel {
  id: number;
  linesOfCodeToCheck: number;
  longestPrLinesOfCode?: number;
  name: string;
  pendingPrs: number;
  sumOfHoursPrsWaiting?: number;

  protected constructor(model: RepositoryModel | UserModel, prs: PrWithChangesReadModel[]) {
    this.id = model.id;
    this.name = model.name;
    this.pendingPrs = prs.length;
    this.sumOfHoursPrsWaiting = this.getSumOfHoursPrsWaiting(prs);
    this.linesOfCodeToCheck = this.getLinesOfCodeToCheck(prs);
    this.longestPrLinesOfCode = this.getLongestPrLinesOfCode(prs);
  }

  private getLongestPrLinesOfCode(prs: PrWithChangesReadModel[]): number {
    return prs.length
      ? prs.reduce((prev, current) => {
          return prev.linesOfCodeToCheck > current.linesOfCodeToCheck ? prev : current;
        }).linesOfCodeToCheck
      : 0;
  }

  private getLinesOfCodeToCheck(prs: PrWithChangesReadModel[]): number {
    return prs.length ? prs.reduce((a, b) => a + b.linesOfCodeToCheck, 0) : 0;
  }

  private getSumOfHoursPrsWaiting(prs: PrWithChangesReadModel[]): number {
    let result = 0;
    const now = new Date();
    prs.forEach(pr => {
      result = (now.getTime() - pr.createdAt.getTime()) / (60 * 60 * 1000);
    });

    return Math.round(result);
  }
}
