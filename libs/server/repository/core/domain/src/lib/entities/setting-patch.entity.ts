import { RepositoryCommonSettingValueDataType } from '@pimp-my-pr/shared/domain';
import { ApiProperty } from '@nestjs/swagger';

export class SettingPatchEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  value: RepositoryCommonSettingValueDataType;
}
