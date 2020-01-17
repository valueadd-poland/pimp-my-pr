export interface RepositoryStatistics {
  name: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  pendingPrs?: number;
  sumOfHoursPrsWaiting?: number;
}
