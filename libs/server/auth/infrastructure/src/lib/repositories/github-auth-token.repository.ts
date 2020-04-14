import { HttpService, Injectable } from '@nestjs/common';
import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { bitbucketConfig, githubConfig, PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { CoreUnauthorizedFoundException } from '@pimp-my-pr/server/shared/domain';
import { convertQueryStringToObj } from '@pimp-my-pr/shared/util-query-string';
import { urlFactory } from '@valueadd/typed-urls';
import { map, tap } from 'rxjs/operators';
import { mapGithubAuthToken } from '../mappers/map-github-auth-token';

@Injectable()
export class GithubAuthTokenRepository {
  endpoints = {
    getBitbucketAccessToken: urlFactory(bitbucketConfig.authUrl),
    getGithubAccessToken: urlFactory(githubConfig.authUrl)
  };

  constructor(private httpService: HttpService, private configService: PmpApiConfigService) {}

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
