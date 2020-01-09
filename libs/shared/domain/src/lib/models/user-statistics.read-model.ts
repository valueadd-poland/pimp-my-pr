export interface UserStatisticsReadModel {
  id: number | string;
  user: string;
  pendingPr: number;
  sumOfTimePrWaiting: number;
  toCheck: number;
  longestPr: number;
}
