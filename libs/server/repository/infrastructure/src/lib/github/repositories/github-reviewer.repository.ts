import { HttpService, Injectable } from '@nestjs/common';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RemoteContributorRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { githubConfig } from '@pimp-my-pr/server/shared/config';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';
import { GithubUserEntity } from '../domain/entities/github-user.entity';
import { mapGithubContributor } from '../mappers/map-github-contributor';

@Injectable()
export class GithubReviewerRepository extends RemoteContributorRepository {
  endpoints = {
    getUser: urlFactory<'id'>(githubConfig.apiUrl + '/user/:id', true)
  };

  constructor(private http: HttpService) {
    super();
  }

  get(id: string, token: string): Promise<ReviewerEntity> {
    return this.http
      .get<GithubUserEntity>(this.endpoints.getUser.url({ id }), {
        headers: { Authorization: `token ${token}` }
      })
      .pipe(
        map(res => res.data),
        map(mapGithubContributor),
        catchRequestExceptions()
      )
      .toPromise();
  }
}
