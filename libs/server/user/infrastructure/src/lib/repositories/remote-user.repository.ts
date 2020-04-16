import { User } from '@pimp-my-pr/server/user/core/domain';

export abstract class RemoteUserRepository {
  abstract getCurrentUser(token: string): Promise<User>;
}
