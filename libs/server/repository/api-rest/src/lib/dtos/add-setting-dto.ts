import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  RepositoryCommonSettingDataType,
  RepositoryCommonSettingValueDataType
} from '@pimp-my-pr/shared/domain';

export class AddSettingDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  value: RepositoryCommonSettingValueDataType;

  @ApiProperty()
  @IsString()
  type: RepositoryCommonSettingDataType;
}
