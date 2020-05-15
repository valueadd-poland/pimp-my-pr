import { ApiProperty } from '@nestjs/swagger';

export class ListRepositoriesReadModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  maxLines?: number;

  @ApiProperty()
  maxWaitingTime?: number;

  @ApiProperty()
  maxPrs?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  pictureUrl: string;

  @ApiProperty()
  repositoryId: string;
}
