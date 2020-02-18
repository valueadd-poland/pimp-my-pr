import { PrChanges, PrModel } from '@pimp-my-pr/server/repository/core/domain';

export abstract class BasePrWithChangesReadModel {
  linesOfCodeToCheck: number;
  createdAt: Date;

  constructor(pr: PrModel, changes: PrChanges) {
    this.createdAt = pr.createdAt;
    this.linesOfCodeToCheck = changes.additions + changes.changes + changes.deletions;
  }
}
