import { HttpService, Injectable } from '@nestjs/common';
import {
  RepositoryEntity,
  RepositoryNotFoundException
} from '@pimp-my-pr/server/repository/core/domain';
import { gitlabConfig } from '@pimp-my-pr/server/shared/config';
import { CoreException, CoreNotFoundException } from '@pimp-my-pr/server/shared/domain';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosError, AxiosResponse } from 'axios';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RemoteRepositoryRepository } from '@pimp-my-pr/server/repository/infrastructure';
import { GitlabRepositoryEntity } from '../domain/entities/gitlab-repository.entity';
import { mapGitlabRepository } from '../mappers/map-gitlab-repository';

@Injectable()
export class GitlabRepositoryRepository extends RemoteRepositoryRepository {
  endpoints = {
    getRepository: urlFactory<'fullName'>(gitlabConfig.apiUrl + '/projects/:fullName', true)
  };

  constructor(private httpService: HttpService) {
    super();
  }

  getSingleRepositoryByName(fullName: string, token: string): Promise<RepositoryEntity> {
    return this.httpService
      .get<GitlabRepositoryEntity>(
        this.endpoints.getRepository.url({ fullName: encodeURIComponent(fullName) }),
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(mapGitlabRepository),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(new RepositoryNotFoundException(fullName));
          }
          return throwError(error);
        })
      )
      .toPromise();
  }
}
