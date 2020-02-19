import { HttpService, Injectable } from '@nestjs/common';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { githubConfig } from '@pimp-my-pr/server/shared/core';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { GithubPrMapper } from '../mappers/github-pr.mapper';

@Injectable()
export class PrDataService {
  endpoints = {
    getPrDetails: urlFactory<'repoFullName' | 'prId'>(
      githubConfig.apiUrl + '/repos/:repoFullName/pulls/:prId',
      true
    )
  };

  prDetailsMapper = new GithubPrMapper();

  constructor(private httpService: HttpService) {}

  get(repoFullName: string, prId: number): Promise<PrEntity> {
    return this.httpService
      .get<GithubPrDetailsEntity>(this.endpoints.getPrDetails.url({ repoFullName, prId }))
      .pipe(
        map((res: AxiosResponse<GithubPrDetailsEntity>) => this.prDetailsMapper.mapFrom(res.data)),
        catchRequestExceptions()
      )
      .toPromise();
  }
}
