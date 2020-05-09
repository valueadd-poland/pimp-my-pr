import { ApiProperty } from '@nestjs/swagger';

export abstract class ContributorReadModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  contributions?: number;
}
