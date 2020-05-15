import { ApiProperty } from '@nestjs/swagger';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryStatisticsReadModel } from '../get-repository-statistics/repository-statistics.read-model';

export class ReviewerStatisticsReadModel {
  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  contributions: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [RepositoryStatisticsReadModel] })
  repositories: RepositoryStatisticsReadModel[];

  constructor(user: ReviewerEntity, repositories: RepositoryStatisticsReadModel[]) {
    this.name = user.name;
    this.id = user.id;
    this.contributions = user.contributions;
    this.avatarUrl = user.avatarUrl;
    this.repositories = repositories;
  }
}
