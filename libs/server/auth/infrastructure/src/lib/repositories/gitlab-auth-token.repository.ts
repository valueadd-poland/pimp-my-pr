import { HttpService, Injectable } from '@nestjs/common';
import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { AuthTokenRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { CoreUnauthorizedFoundException } from '@pimp-my-pr/server/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { map, tap } from 'rxjs/operators';
import { mapGitlabAuthToken } from '../mappers/map-gitlab-auth-token';
import { GitlabAuthResponse } from '../interfaces/gitlab-auth-response.interface';
import { gitlabConfig, PmpApiConfigService } from '@pimp-my-pr/server/shared/config';

@Injectable()
export class GitlabAuthTokenRepository extends AuthTokenRepository {
  endpoints = {
    getAccessToken: urlFactory(gitlabConfig.authUrl)
  };

  constructor(private httpService: HttpService, private configService: PmpApiConfigService) {
    super();
  }

  getAccessToken(gitlabCode: string): Promise<AuthTokenEntity> {
    const gitlabSecrets = {
      client_id: this.configService.getGitlabClientId(),
      client_secret: this.configService.getGitlabClientSecret(),
      code: gitlabCode,
      grant_type: gitlabConfig.grant_type,
      redirect_uri: this.configService.getGitlabRedirectUri()
    };

    return this.httpService
      .post<GitlabAuthResponse>(this.endpoints.getAccessToken.url(), gitlabSecrets)
      .pipe(
        map(res => res.data),
        tap(res => {
          if (res.error) {
            throw new CoreUnauthorizedFoundException(res.error_description || res.error);
          }
        }),
        map(mapGitlabAuthToken)
      )
      .toPromise();
  }
}
