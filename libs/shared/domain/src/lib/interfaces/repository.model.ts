import { PrStatistics } from './pr.statistics';

export interface RepositoryModel {
  name: string;
  fullName: string;
  owner: string;
  pictureUrl: string;
  prsStatistics: PrStatistics[];
  maxLines?: number;
  maxPrs?: number;
  maxWaitingTime?: number;
  id: string;
}
