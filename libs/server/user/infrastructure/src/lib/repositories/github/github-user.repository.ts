import { HttpService, Injectable } from '@nestjs/common';
import { githubConfig } from '@pimp-my-pr/server/shared/config';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';
import { mapGithubUser } from './map-github-user';
import { RemoteUserRepository } from '../remote-user.repository';
import { GithubUser } from './github-user.entity';

@Injectable()
export class GithubUserRepository extends RemoteUserRepository {
  endpoints = {
    getCurrentUser: urlFactory(`${githubConfig.apiUrl}/user`)
  };

  constructor(private httpService: HttpService) {
    super();
  }

  getCurrentUser(token: string): Promise<User> {
    return this.httpService
      .get<GithubUser>(this.endpoints.getCurrentUser.url(), {
        headers: { Authorization: `token ${token}` }
      })
      .pipe(
        map(res => res.data),
        map(mapGithubUser)
      )
      .toPromise();
  }
}
