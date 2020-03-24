import { ApiProperty } from '@nestjs/swagger';

export class AddRepositoryDto {
  @ApiProperty()
  repositoryName: string;

  @ApiProperty()
  maxLines?: number;

  @ApiProperty()
  maxWaitingTime?: number;
}
