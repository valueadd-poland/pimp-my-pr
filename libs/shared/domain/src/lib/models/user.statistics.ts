export interface UserStatistics {
  id: number;
  name: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  pendingPrs?: number;
  sumOfHoursPrsWaiting?: number;
}
