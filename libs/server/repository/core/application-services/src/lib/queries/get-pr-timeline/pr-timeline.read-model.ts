import { TimelineRecord } from '@pimp-my-pr/server/repository/core/domain';
import { ApiProperty } from '@nestjs/swagger';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

export class PrTimelineReadModel {
  @ApiProperty({
    enum: TimelineStep
  })
  step: TimelineStep;

  @ApiProperty()
  dateFrom: Date;

  @ApiProperty()
  dateTo: Date;

  @ApiProperty({
    description: 'Pull requests were taken into account that were created after this date'
  })
  createdAfter: Date;

  @ApiProperty({
    type: [TimelineRecord]
  })
  data: TimelineRecord[];

  @ApiProperty()
  totalPrs: number;
}
