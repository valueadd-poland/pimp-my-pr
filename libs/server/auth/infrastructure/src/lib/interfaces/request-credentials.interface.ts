import { Platform } from '@pimp-my-pr/shared/domain';

export interface RequestCredentials {
  token: string;
  platform: Platform;
}
