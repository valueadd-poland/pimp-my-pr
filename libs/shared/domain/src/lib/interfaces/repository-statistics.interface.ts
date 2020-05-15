import { PrStatistics } from '@pimp-my-pr/shared/domain';

export interface RepositoryStatistics {
  id: string;
  name: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  pendingPrs?: number;
  pictureUrl: string;
  sumOfHoursPrsWaiting?: number;
  prsStatistics?: PrStatistics[];
  maxLines?: number;
  maxPrs?: number;
  maxWaitingTime?: number;
  maxLinesWarning: boolean;
  maxWaitingTimeWarning: boolean;
  maxPrsWarning: boolean;
}
