import { PrStatistics } from '@pimp-my-pr/shared/domain';

export interface RepositoryStatistics {
  averageCodeToCheck?: number;
  averagePrWaiting?: number;
  id: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  longestWaitingPr?: number;
  maxLines?: number;
  maxLinesWarning: boolean;
  maxPrs?: number;
  maxPrsWarning: boolean;
  maxWaitingTime?: number;
  maxWaitingTimeWarning: boolean;
  missingReviewerWarning?: boolean;
  name: string;
  pendingPrs?: number;
  pictureUrl: string;
  reviewersCount?: number;
  sumOfHoursPrsWaiting?: number;
  prsStatistics?: PrStatistics[];
}
