import { IsEnum, IsString } from 'class-validator';
import { Platform } from '@pimp-my-pr/shared/domain';

export class AccessTokenBodyDto {
  @IsString()
  code: string;

  @IsEnum(Platform, { message: `available platforms: ${Object.values(Platform).join(', ')}` })
  platform: Platform;
}
