import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';

export const authTokenRepositoryFactoryToken = Symbol('AuthTokenRepositoryFactory');

export abstract class AuthTokenRepository {
  abstract getAccessToken(code: string): Promise<AuthTokenEntity>;
}
