import { PrStatistics } from '@pimp-my-pr/shared/domain';

export class RepositoryPrsStatisticsReadModel {
  id: number;
  fullName: string;
  name: string;
  owner: string;
  pictureUrl: string;
  prsStatistics: PrStatistics[];
}
