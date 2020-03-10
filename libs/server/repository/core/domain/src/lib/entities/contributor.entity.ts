import { f } from '@marcj/marshal';
import { ApiProperty } from '@nestjs/swagger';

export abstract class ContributorEntity {
  @ApiProperty()
  @f
  name: string;
  @ApiProperty()
  @f
  id: string;
  @ApiProperty()
  @f
  avatarUrl: string;
  @f
  contributions?: number;
}
