import { PrStatistics } from '@pimp-my-pr/shared/domain';

export class RepositoryStatisticsReadModel {
  id: number;
  fullName: string;
  name: string;
  owner: string;
  pictureUrl: string;
  prsStatistics: PrStatistics[];
}
