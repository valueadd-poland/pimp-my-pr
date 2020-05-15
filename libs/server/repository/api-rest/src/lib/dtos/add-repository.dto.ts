import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUrl } from 'class-validator';

export class AddRepositoryDto {
  @ApiProperty()
  @IsUrl()
  repositoryUrl: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  maxLines?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  maxWaitingTime?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  maxPrs?: number;
}
