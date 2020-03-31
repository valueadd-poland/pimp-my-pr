import { HttpService, Injectable } from '@nestjs/common';
import { urlFactory } from '@valueadd/typed-urls';
import { map, tap } from 'rxjs/operators';
import { URLSearchParams } from 'url';
import { bitbucketConfig, githubConfig, PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { BaseAuthRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { convertQueryStringToObj } from '@pimp-my-pr/shared/util-query-string';
import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { mapGithubAuthToken } from '../mappers/map-github-auth-token';
import { CoreUnauthorizedFoundException } from '@pimp-my-pr/server/shared/domain';
import { mapBitbucketToken } from '../mappers/map-bitbucket-auth-token';
import { BitbucketAuthResponse } from '../interfaces/bitbucket-auth-response.interface';

@Injectable()
export class AuthRepository extends BaseAuthRepository {
  endpoints = {
    getBitbucketAccessToken: urlFactory(bitbucketConfig.authUrl),
    getGithubAccessToken: urlFactory(githubConfig.authUrl)
  };

  constructor(private httpService: HttpService, private configService: PmpApiConfigService) {
    super();
  }

  getBitbucketAccessToken(bitbucketCode: string): Promise<AuthTokenEntity> {
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

  getGithubAccessToken(githubCode: string): Promise<AuthTokenEntity> {
    const githubSecrets = {
      client_id: this.configService.getGithubClientId(),
      client_secret: this.configService.getGithubClientSecret(),
      code: githubCode
    };

    return this.httpService
      .post<string>(this.endpoints.getGithubAccessToken.url(), githubSecrets)
      .pipe(
        map(res => convertQueryStringToObj(res.data)),
        tap(res => {
          if (res.error) {
            throw new CoreUnauthorizedFoundException(res.error_description || res.error);
          }
        }),
        map(mapGithubAuthToken)
      )
      .toPromise();
  }
}
