import { HttpService, Injectable } from '@nestjs/common';
import {
  RepositoryEntity,
  RepositoryNotFoundException
} from '@pimp-my-pr/server/repository/core/domain';
import { bitbucketConfig } from '@pimp-my-pr/server/shared/core';
import { CoreException, CoreNotFoundException } from '@pimp-my-pr/server/shared/domain';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosError, AxiosResponse } from 'axios';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RemoteRepositoryRepository } from '../../repositories/remote-repository.repository';
import { BitbucketRepositoryEnity } from '../domain/entities/bitbucket-repository.enity';
import { mapBitbucketRepository } from '../mappers/map-bitbucket-repository';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

@Injectable()
export class BitbucketRepositoryRepository extends RemoteRepositoryRepository {
  endpoints = {
    getRepository: urlFactory<'fullName'>(bitbucketConfig.apiUrl + '/repositories/:fullName', true),
    getRepositoryById: urlFactory<'repositoryId' | 'workspace'>(
      bitbucketConfig.apiUrl + '/repositories/:workspace/:repositoryId',
      true
    )
  };

  constructor(private httpService: HttpService) {
    super();
  }

  getSingleRepositoryByName(fullName): Promise<RepositoryEntity> {
    return this.httpService
      .get<BitbucketRepositoryEnity>(this.endpoints.getRepository.url({ fullName }))
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(mapBitbucketRepository),
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

  getSingleRepositoryById(id: string, workspace: string): Promise<RepositoryEntity> {
    return this.httpService
      .get<BitbucketRepositoryEnity>(
        this.endpoints.getRepositoryById.url({
          repositoryId: BitbucketUuidUtil.parseTo(id),
          workspace
        })
      )
      .pipe(
        map(res => res.data),
        map(mapBitbucketRepository),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(new RepositoryNotFoundException(`${id}`));
          }
          return throwError(error);
        })
      )
      .toPromise();
  }
}
