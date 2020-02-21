import { HttpService, Injectable } from '@nestjs/common';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { githubConfig } from '@pimp-my-pr/server/shared/core';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';
import { GithubUserEntity } from '../domain/entities/github-user.entity';
import { GithubUserMapper } from '../mappers/github-user.mapper';
import { ReviewerRepository } from '@pimp-my-pr/server/repository/core/domain-services';

@Injectable()
export class GithubReviewerRepository extends ReviewerRepository {
  endpoints = {
    getUser: urlFactory<'username'>(githubConfig.apiUrl + '/users/:username', true)
  };

  userMapper = new GithubUserMapper();

  constructor(private http: HttpService) {
    super();
  }

  get(id: string): Promise<ReviewerEntity> {
    return this.http
      .get<GithubUserEntity>(this.endpoints.getUser.url({ username: id }))
      .pipe(
        map(res => res.data),
        map(githubUser => this.userMapper.mapFrom(githubUser)),
        catchRequestExceptions()
      )
      .toPromise();
  }
}
