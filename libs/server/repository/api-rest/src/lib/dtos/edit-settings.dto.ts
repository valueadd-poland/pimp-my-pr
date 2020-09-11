import { ApiProperty } from '@nestjs/swagger';
import {
  RepositoryCommonSettingType,
  RepositoryCommonSettingValueDataType
} from '@pimp-my-pr/shared/domain';
import { SettingPatchEntity } from '@pimp-my-pr/server/repository/core/domain';

export class EditSettingsDto {
  @ApiProperty({
    type: [SettingPatchEntity]
  })
  patch: SettingPatchEntity[];
}
