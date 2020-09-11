import { ApiProperty } from '@nestjs/swagger';
import {
  RepositoryCommonSettingDataType,
  RepositoryCommonSettingValidatorConfig,
  RepositoryCommonSettingValueDataType
} from '@pimp-my-pr/shared/domain';

export class GetUserSettingsReadModel {
  @ApiProperty()
  value: RepositoryCommonSettingValueDataType;
  @ApiProperty({
    enum: ['boolean', 'string', 'number']
  })
  type: RepositoryCommonSettingDataType;
  @ApiProperty()
  key: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  validators: RepositoryCommonSettingValidatorConfig[];
}
