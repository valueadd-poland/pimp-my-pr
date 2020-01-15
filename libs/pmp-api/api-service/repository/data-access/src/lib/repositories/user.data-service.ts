import { HttpService, Injectable } from '@nestjs/common';
import { urlFactory } from '@valueadd/typed-urls';
import { githubConfig } from '@pimp-my-pr/pmp-api/shared/config';
import { UserModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { GithubUserEntity } from '../domain/entities/github-user.entity';
import { GithubUserMapper } from '../mappers/github-user.mapper';
import { map } from 'rxjs/operators';
import { catchRequestExceptions } from '@pimp-my-pr/pmp-api/shared/util';

@Injectable()
export class UserDataService {
  endpoints = {
    getUser: urlFactory<'username'>(githubConfig.apiUrl + '/users/:username', true)
  };

  userMapper = new GithubUserMapper();

  constructor(private http: HttpService) {}

  getUser(username: string): Promise<UserModel> {
    return this.http
      .get<GithubUserEntity>(this.endpoints.getUser.url({ username }))
      .pipe(
        map(res => res.data),
        map(githubUser => this.userMapper.mapFrom(githubUser)),
        catchRequestExceptions()
      )
      .toPromise();
  }
}
