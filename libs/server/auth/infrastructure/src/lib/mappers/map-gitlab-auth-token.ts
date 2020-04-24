import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { plainToClass } from '@marcj/marshal';
import { GitlabAuthResponse } from '../interfaces/gitlab-auth-response.interface';

export function mapGitlabAuthToken(authToken: GitlabAuthResponse): AuthTokenEntity {
  return plainToClass(AuthTokenEntity, {
    ...authToken,
    token: authToken.access_token,
    type: authToken.token_type
  });
}
