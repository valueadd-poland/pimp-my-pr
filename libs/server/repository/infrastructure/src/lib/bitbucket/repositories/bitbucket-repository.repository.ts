import { HttpService, Injectable } from '@nestjs/common';
import {
  RepositoryEntity,
  RepositoryNotFoundException
} from '@pimp-my-pr/server/repository/core/domain';
import { bitbucketConfig } from '@pimp-my-pr/server/shared/config';
import {
  CoreException,
  CoreNotFoundException,
  CoreUnprocessableEntityException
} from '@pimp-my-pr/server/shared/domain';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosError, AxiosResponse } from 'axios';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RemoteRepositoryRepository } from '../../repositories/remote-repository.repository';
import { BitbucketRepositoryEntity } from '../domain/entities/bitbucket-repository.entity';
import { mapBitbucketRepository } from '../mappers/map-bitbucket-repository';

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

  getSingleRepositoryByName(fullName, token: string): Promise<RepositoryEntity> {
    return this.httpService
      .get<BitbucketRepositoryEntity>(this.endpoints.getRepository.url({ fullName }), {
        headers: { Authorization: `Bearer ${token}` }
      })
      .pipe(
        map((res: AxiosResponse) => {
          if (!(res.data.username || res.data.nickname)) {
            throw new CoreUnprocessableEntityException(
              `Cannot resolve the owner of the ${fullName}`
            );
          }
          return res.data;
        }),
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
}
