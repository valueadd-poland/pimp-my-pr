import { HttpService, Injectable } from '@nestjs/common';
import { GithubPR } from '../../domain/entities/github-pr.entity';
import { githubConfig } from '@pimp-my-pr/pmp-api/shared/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { urlFactory } from '@valueadd/typed-urls';
import { Project } from '@pimp-my-pr/pmp-api/project/domain';

@Injectable()
export class GithubPRRepository {
  readonly endpoints = {
    prs: urlFactory<'fullName'>(
      githubConfig.apiUrl + '/repos/:fullName/pulls',
      true
    )
  };

  constructor(private httpService: HttpService) {}

  getAllPRs(project: Project, authToken: string): Observable<GithubPR[]> {
    return this.httpService
      .get<GithubPR[]>(this.endpoints.prs.url({ fullName: project.fullName }), {
        headers: { Authorization: 'token ' + authToken }
      })
      .pipe(map((res: AxiosResponse) => res.data));
  }
}
