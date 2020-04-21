import { HttpService, Injectable } from '@nestjs/common';
import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { AuthTokenRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { bitbucketConfig, PmpApiConfigService } from '@pimp-my-pr/server/shared/config';
import { CoreUnauthorizedFoundException } from '@pimp-my-pr/server/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { map, tap } from 'rxjs/operators';
import { URLSearchParams } from 'url';
import { BitbucketAuthResponse } from '../interfaces/bitbucket-auth-response.interface';
import { mapBitbucketToken } from '../mappers/map-bitbucket-auth-token';

@Injectable()
export class BitbucketAuthTokenRepository extends AuthTokenRepository {
  endpoints = {
    getBitbucketAccessToken: urlFactory(bitbucketConfig.authUrl)
  };

  constructor(private httpService: HttpService, private configService: PmpApiConfigService) {
    super();
  }

  getAccessToken(bitbucketCode: string): Promise<AuthTokenEntity> {
    const params = new URLSearchParams();
    params.append('code', bitbucketCode);
    params.append('grant_type', 'authorization_code');

    const secrets = {
      client_id: this.configService.getBitbucketClientId(),
      client_secret: this.configService.getBitbucketClientSecret()
    };

    return this.httpService
      .post<BitbucketAuthResponse>(this.endpoints.getBitbucketAccessToken.url(), params, {
        auth: {
          username: secrets.client_id,
          password: secrets.client_secret
        },
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .pipe(
        map(res => res.data),
        tap(res => {
          if (res.error) {
            throw new CoreUnauthorizedFoundException(res.error_description || res.error);
          }
        }),
        map(mapBitbucketToken)
      )
      .toPromise();
  }
}
