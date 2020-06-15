import { PrStatistics } from '@pimp-my-pr/shared/domain';

export interface RepositoryStatistics {
  id: string;
  name: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  pendingPrs?: number;
  pictureUrl: string;
  sumOfHoursPrsWaiting?: number;
  reviewersCount?: number;
  averagePrWaiting?: number;
  averageCodeToCheck?: number;
  longestWaitingPr?: number;
  prsStatistics?: PrStatistics[];
}
