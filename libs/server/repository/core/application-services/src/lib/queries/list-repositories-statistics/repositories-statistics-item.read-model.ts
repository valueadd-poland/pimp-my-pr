import { ApiProperty } from '@nestjs/swagger';
import { PrEntity, RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BaseStatisticsReadModel } from '../../read-models/base-statistics.read-model';
import { getTimeDiffInHours } from '@pimp-my-pr/shared/util-time-diff-in-hours';

export class RepositoriesStatisticsItemReadModel extends BaseStatisticsReadModel {
  @ApiProperty()
  owner: string;

  @ApiProperty()
  pictureUrl: string;

  @ApiProperty()
  maxLines: number;

  @ApiProperty()
  maxPrs: number;

  @ApiProperty()
  maxPrsWarning: boolean;

  @ApiProperty()
  maxWaitingTime: number;

  constructor(repository: RepositoryEntity, prs: PrEntity[]) {
    super(repository, prs);
    this.maxLines = repository.maxLines;
    this.maxPrs = repository.maxPrs;
    this.maxWaitingTime = repository.maxWaitingTime;
    this.owner = repository.owner;
    this.pictureUrl = repository.pictureUrl;
    this.maxPrsWarning = prs.length > repository.maxPrs;
    this.maxLinesWarning = prs.some(pr => pr.linesOfCodeToCheck > repository.maxLines);
    this.maxWaitingTimeWarning = prs.some(
      pr => getTimeDiffInHours(pr.updatedAt) > repository.maxWaitingTime
    );
  }
}
