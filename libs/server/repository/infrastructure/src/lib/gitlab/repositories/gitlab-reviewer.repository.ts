import { HttpService, Injectable } from '@nestjs/common';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { gitlabConfig } from '@pimp-my-pr/server/shared/config';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';
import { GitlabUserEntity } from '../domain/entities/gitlab-user.entity';
import { mapGitlabUser } from '../mappers/map-gitlab-user';
import { RemoteContributorRepository } from '@pimp-my-pr/server/repository/core/domain-services';

@Injectable()
export class GitlabReviewerRepository extends RemoteContributorRepository {
  endpoints = {
    getUser: urlFactory<'id'>(gitlabConfig.apiUrl + '/users/:id', true)
  };

  constructor(private http: HttpService) {
    super();
  }

  get(id: string, token: string): Promise<ReviewerEntity> {
    return this.http
      .get<GitlabUserEntity>(this.endpoints.getUser.url({ id }), {
        headers: { Authorization: `Bearer ${token}` }
      })
      .pipe(
        map(res => res.data),
        map(mapGitlabUser),
        catchRequestExceptions()
      )
      .toPromise();
  }
}
