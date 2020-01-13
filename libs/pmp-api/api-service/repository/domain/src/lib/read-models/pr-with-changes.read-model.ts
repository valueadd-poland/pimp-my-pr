import { PrChanges, PrModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';

export class PrWithChangesReadModel {
  linesOfCodeToCheck: number;
  createdAt: Date;

  constructor(protected pr: PrModel, protected changes: PrChanges) {
    this.createdAt = pr.createdAt;
    this.linesOfCodeToCheck = changes.additions + changes.changes + changes.deletions;
  }
}
