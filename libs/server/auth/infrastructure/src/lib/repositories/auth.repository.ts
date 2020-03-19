import { HttpService, Injectable } from '@nestjs/common';
import { urlFactory } from '@valueadd/typed-urls';
import { map, tap } from 'rxjs/operators';
import { githubConfig, PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { BaseAuthRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { convertQueryStringToObj } from '@pimp-my-pr/shared/util-query-string';
import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { mapGithubAuthToken } from '../mappers/map-github-auth-token';
import { CoreUnauthorizedFoundException } from '@pimp-my-pr/server/shared/domain';

@Injectable()
export class AuthRepository extends BaseAuthRepository {
  endpoints = {
    getGithubAccessToken: urlFactory(githubConfig.authUrl)
  };

  constructor(private httpService: HttpService, private configService: PmpApiConfigService) {
    super();
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
