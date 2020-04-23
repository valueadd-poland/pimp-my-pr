export interface ReviewerStatistics {
  avatarUrl: string;
  id: string;
  name: string;
  linesOfCodeToCheck?: number;
  longestPrLinesOfCode?: number;
  pendingPrs?: number;
  sumOfHoursPrsWaiting?: number;
}
