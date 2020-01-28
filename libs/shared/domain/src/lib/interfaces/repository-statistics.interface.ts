import { PrStatistics } from '@pimp-my-pr/shared/domain';

export interface RepositoryStatistics {
  id: number;
  name: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  pendingPrs?: number;
  pictureUrl: string;
  sumOfHoursPrsWaiting?: number;
  prsStatistics?: PrStatistics[];
}
