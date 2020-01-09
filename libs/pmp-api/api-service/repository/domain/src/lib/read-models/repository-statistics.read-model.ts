import { RepositoryModel } from '../models/repository.model';
import { PrWithChangesReadModel } from './pr-with-changes.read-model';

export class RepositoryStatisticsReadModel {
  linesOfCodeToCheck: number;
  longestPrLinesOfCode?: number;
  name: string;
  owner: string;
  pendingPrs: number;
  sumOfHoursPrsWaiting?: number;

  constructor(repository: RepositoryModel, prs: PrWithChangesReadModel[]) {
    this.name = repository.name;
    this.owner = repository.owner;
    this.pendingPrs = prs.length;
    this.sumOfHoursPrsWaiting = this.getSumOfHoursPrsWaiting(prs);
    this.linesOfCodeToCheck = this.getLinesOfCodeToCheck(prs);
    this.longestPrLinesOfCode = this.getLongestPrLinesOfCode(prs);
  }

  private getLongestPrLinesOfCode(prs: PrWithChangesReadModel[]): number {
    return prs.reduce((prev, current) => {
      return prev.linesOfCodeToCheck > current.linesOfCodeToCheck ? prev : current;
    }).linesOfCodeToCheck;
  }

  private getLinesOfCodeToCheck(prs: PrWithChangesReadModel[]): number {
    return prs.reduce((a, b) => a + b.linesOfCodeToCheck, 0);
  }

  private getSumOfHoursPrsWaiting(prs: PrWithChangesReadModel[]): number {
    let result = 0;
    const now = new Date();
    prs.forEach(pr => {
      result = (now.getTime() - pr.createdAt.getTime()) / (60 * 60 * 1000);
    });

    return result;
  }
}
