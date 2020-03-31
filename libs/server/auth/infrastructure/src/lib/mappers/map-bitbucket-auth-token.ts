import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { plainToClass } from '@marcj/marshal';
import { BitbucketAuthResponse } from '../interfaces/bitbucket-auth-response.interface';

export function mapBitbucketToken(bitbucketAuthResponse: BitbucketAuthResponse): AuthTokenEntity {
  return plainToClass(AuthTokenEntity, {
    scope: bitbucketAuthResponse.scopes,
    token: bitbucketAuthResponse.access_token,
    type: bitbucketAuthResponse.token_type
  });
}
