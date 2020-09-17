import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

export class GenerateTimelineDto {
  @ApiProperty({ enum: TimelineStep })
  @IsIn(Object.values(TimelineStep))
  step: TimelineStep;

  @ApiProperty({
    description: 'Beginning of the tracked period - every subsequent record is older'
  })
  @IsDate()
  @Transform(value => new Date(value))
  timelineFrom: Date;

  @ApiProperty({
    description: 'Beginning of the tracked period - every subsequent record is older'
  })
  @IsDate()
  @Transform(value => new Date(value))
  timelineTo: Date;
}
