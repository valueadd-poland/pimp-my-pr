import { plainToClass } from '@marcj/marshal';
import { HttpService, Injectable } from '@nestjs/common';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { RemoteUserRepository } from '../remote-user.repository';
import { mapGitlabUser } from './map-gitlab-user';
import { GitlabUser } from './gitlab-user.entity';
import { gitlabConfig } from '@pimp-my-pr/server/shared/config';

@Injectable()
export class GitlabUserRepository extends RemoteUserRepository {
  endpoints = {
    currentUser: urlFactory(gitlabConfig.apiUrl + '/user')
  };

  constructor(private httpService: HttpService) {
    super();
  }

  getCurrentUser(token: string): Promise<User> {
    return this.httpService
      .get<GitlabUser>(this.endpoints.currentUser.url(), {
        headers: { Authorization: `Bearer ${token}` }
      })
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(data => plainToClass(User, mapGitlabUser(data))),
        catchRequestExceptions()
      )
      .toPromise();
  }
}
