export interface RepositoryStatisticsReadModel {
  comments: string[];
  id: number | string;
  prUrl: string;
  sumOfTimePrWaiting: number;
  title: string;
  toCheck: number;
  user: string;
  userPicture: string;
}
