export interface RepositoryStatistics {
  id: number;
  name: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  pendingPrs?: number;
  sumOfHoursPrsWaiting?: number;
}
