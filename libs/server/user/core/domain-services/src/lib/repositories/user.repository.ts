import { User } from '@pimp-my-pr/server/user/core/domain';
import { Platform } from '@pimp-my-pr/shared/domain';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | undefined>;

  abstract getById(userId: string): Promise<User>;

  abstract loadCurrentUser(token: string, platform: Platform): Promise<User>;

  abstract save(user: User): Promise<User>;
}
