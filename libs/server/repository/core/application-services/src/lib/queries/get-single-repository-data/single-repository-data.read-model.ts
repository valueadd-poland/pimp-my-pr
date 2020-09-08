import { ApiProperty } from '@nestjs/swagger';

export class SingleRepositoryDataReadModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  maxLines?: number;

  @ApiProperty()
  maxWaitingTime?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  pictureUrl: string;

  @ApiProperty()
  repositoryId: string;
}
