import { Project, Tokens } from '@pimp-my-pr/pmp-api/project/domain';
import { Injectable } from '@nestjs/common';
import { GithubProjectRepository } from './github/github-project.repository';
import { merge, Observable, of } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { GithubProject } from '../domain/entities/github.project';
import { GithubProjectMapper } from '../mappers/github-project.mapper';

@Injectable()
export class ProjectRepository {
  constructor(private githubProjectRepository: GithubProjectRepository) {}

  githubMapper = new GithubProjectMapper();

  async createProject(project: Project): Promise<Project> {
    //ToDo implement
    return project;
  }

  async getAllExternalProjects({
    githubToken,
    bitbucketToken
  }: Tokens): Promise<Project[]> {
    let getFromGithub: Observable<GithubProject[]> = of([]);
    let getFromBitbucket: Observable<GithubProject[]> = of([]);

    if (githubToken) {
      getFromGithub = this.githubProjectRepository.getAllProjects(githubToken);
    }
    if (bitbucketToken) {
      //ToDo add implementation for bitbucket
      getFromBitbucket = of([]);
    }

    return merge(getFromGithub, getFromBitbucket)
      .pipe(
        scan<GithubProject[]>((all, current) => all.concat(current), []),
        map((projects: GithubProject[]) =>
          projects.map(this.githubMapper.mapFrom)
        )
      )
      .toPromise();
  }
}
