import { ApiProperty } from '@nestjs/swagger';

export class AddRepositoryDto {
  @ApiProperty()
  repositoryName: string;
}
