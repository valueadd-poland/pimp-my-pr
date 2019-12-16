import { PR, Project, Tokens } from '@pimp-my-pr/pmp-api/project/domain';
import { Injectable } from '@nestjs/common';
import { merge, of } from 'rxjs';
import { scan } from 'rxjs/operators';
import { GithubPRRepository } from './github/github-pr.repository';

@Injectable()
export class PRRepository {
  constructor(private githubPRRepository: GithubPRRepository) {}

  async createPR(pr: PR): Promise<PR> {
    console.log(pr.title);
    return pr;
  }

  async getAllExternalPRs(
    project: Project,
    { githubToken, bitbucketToken }: Tokens
  ): Promise<PR[]> {
    let getFromGithub = of([]);
    let getFromBitbucket = of([]);

    if (githubToken) {
      getFromGithub = this.githubPRRepository.getAllPRs(project, githubToken);
    }
    if (bitbucketToken) {
      //ToDo add implementation for bitbucket
      getFromBitbucket = of([]);
    }

    return merge(getFromGithub, getFromBitbucket)
      .pipe(scan<PR[]>((all, current) => all.concat(current), []))
      .toPromise();
  }
}
