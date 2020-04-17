import { plainToClass } from '@marcj/marshal';
import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';

export function mapGithubAuthToken(authToken: Record<string, string>): AuthTokenEntity {
  return plainToClass(AuthTokenEntity, {
    ...authToken,
    token: authToken.access_token,
    type: authToken.token_type
  });
}
