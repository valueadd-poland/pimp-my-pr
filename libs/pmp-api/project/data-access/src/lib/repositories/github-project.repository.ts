import { HttpService, Injectable } from '@nestjs/common';
import { ExternalProjectRepository } from './external-project.repository';
import { Project } from '@pimp-my-pr/pmp-api/project/domain';
import { githubConfig } from '@pimp-my-pr/pmp-api/shared/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { GithubProjectEntity } from '../domain/github-project.entity';

@Injectable()
export class GithubProjectRepository implements ExternalProjectRepository {
  readonly endpoints = {
    projects: githubConfig.apiUrl + '/user/repos'
  };

  constructor(private httpService: HttpService) {}

  getAllProjects(authToken: string): Observable<GithubProjectEntity[]> {
    return this.httpService
      .get<Project[]>(this.endpoints.projects, {
        headers: { Authorization: 'token ' + authToken }
      })
      .pipe(map((res: AxiosResponse) => res.data));
  }
}
