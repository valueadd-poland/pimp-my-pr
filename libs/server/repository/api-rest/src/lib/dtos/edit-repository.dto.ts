import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class EditRepositoryDto {
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
