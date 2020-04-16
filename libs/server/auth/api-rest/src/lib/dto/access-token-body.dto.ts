import { Platform } from '@pimp-my-pr/shared/domain';
import { IsEnum, IsString } from 'class-validator';

export class AccessTokenBodyDto {
  @IsString()
  code: string;

  @IsEnum(Platform, { message: `available platforms: ${Object.values(Platform).join(', ')}` })
  platform: Platform;
}
