import { ApiProperty } from '@nestjs/swagger';

export class AddRepositoryDto {
  @ApiProperty()
  repositoryUrl: string;

  @ApiProperty()
  maxLines?: number;

  @ApiProperty()
  maxWaitingTime?: number;
}
