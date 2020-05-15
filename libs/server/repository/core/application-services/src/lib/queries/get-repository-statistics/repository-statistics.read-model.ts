import { ApiProperty } from '@nestjs/swagger';
import { PrStatisticsReadModel } from '../../read-models/pr-statistics.read-model';

export class RepositoryStatisticsReadModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  pictureUrl: string;

  @ApiProperty({ type: [PrStatisticsReadModel] })
  prsStatistics: PrStatisticsReadModel[];

  @ApiProperty()
  maxLines: number;

  @ApiProperty()
  maxPrs: number;

  @ApiProperty()
  maxWaitingTime: number;
}
