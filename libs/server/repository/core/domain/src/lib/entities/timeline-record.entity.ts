import { ApiProperty } from '@nestjs/swagger';

export class TimelineRecord {
  @ApiProperty()
  dataFrom: Date;
  @ApiProperty()
  sumCount: number;
  @ApiProperty()
  avgCount: number;
  @ApiProperty()
  avgWaitingTime: number;
  /**
   * This property is required to calculate total prs in any period on timeline
   */
  @ApiProperty()
  closedBefore: number;
  /**
   * This property is required to calculate total prs in any period on timeline
   */
  @ApiProperty()
  openedAfter: number;
}
