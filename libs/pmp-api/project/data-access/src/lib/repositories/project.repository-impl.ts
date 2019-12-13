import {
  Project,
  ProjectRepository,
  Tokens
} from '@pimp-my-pr/pmp-api/project/domain';
import { Injectable } from '@nestjs/common';
import { GithubProjectRepository } from './github-project.repository';
import { merge, of } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable()
export class ProjectRepositoryImpl extends ProjectRepository {
  constructor(private githubProjectRepository: GithubProjectRepository) {
    super();
  }

  async createProject(project: Project): Promise<Project> {
    //ToDo implement
    return project;
  }

  async getAllExternalProjects({
    githubToken,
    bitbucketToken
  }: Tokens): Promise<Project[]> {
    let getFromGithub = of([]);
    let getFromBitbucket = of([]);

    //ToDo add implementation for bitbucket
    if (githubToken) {
      getFromGithub = this.githubProjectRepository.getAllProjects(githubToken);
    }

    return merge(getFromGithub, getFromBitbucket)
      .pipe(scan<Project[]>((all, current) => [...all, current], []))
      .toPromise();
  }
}
