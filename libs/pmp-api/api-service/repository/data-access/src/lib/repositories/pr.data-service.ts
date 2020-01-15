import { HttpService, Injectable } from '@nestjs/common';
import { githubConfig, PmpApiServiceConfigService } from '@pimp-my-pr/pmp-api/shared/config';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { PrChanges, PrDetailsModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { GithubPrFilesEntity } from '../domain/entities/github-pr-files.entity';
import { catchRequestExceptions } from '@pimp-my-pr/pmp-api/shared/util';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { GithubPrDetailsMapper } from '../mappers/github-pr-details.mapper';

@Injectable()
export class PrDataService {
  endpoints = {
    getPrDetails: urlFactory<'repoFullName' | 'prId'>(
      githubConfig.apiUrl + '/repos/:repoFullName/pulls/:prId',
      true
    ),
    getPrFiles: urlFactory<'repoFullName' | 'prId'>(
      githubConfig.apiUrl + '/repos/:repoFullName/pulls/:prId/files',
      true
    )
  };

  prDetailsMapper = new GithubPrDetailsMapper();

  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {}

  getPrChanges(repoFullName: string, prId: number): Promise<PrChanges> {
    return this.httpService
      .get<GithubPrFilesEntity[]>(
        this.endpoints.getPrFiles.url({
          repoFullName,
          prId
        })
      )
      .pipe(
        map((res: AxiosResponse<GithubPrFilesEntity[]>) => res.data),
        map(files =>
          files.reduce((prev, current) => {
            return {
              additions: prev.additions + current.additions,
              changes: prev.changes + current.changes,
              deletions: prev.deletions + current.deletions
            };
          })
        ),
        catchRequestExceptions()
      )
      .toPromise();
  }

  getPrDetails(repoFullName: string, prId: number): Promise<PrDetailsModel> {
    return this.httpService
      .get<GithubPrDetailsEntity>(this.endpoints.getPrDetails.url({ repoFullName, prId }))
      .pipe(
        map((res: AxiosResponse<GithubPrDetailsEntity>) => this.prDetailsMapper.mapFrom(res.data)),
        catchRequestExceptions()
      )
      .toPromise();
  }
}
