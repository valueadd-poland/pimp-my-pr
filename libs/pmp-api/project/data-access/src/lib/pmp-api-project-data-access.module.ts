import { HttpModule, Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { GithubProjectRepository } from './repositories/github/github-project.repository';
import { GithubPRRepository } from './repositories/github/github-pr.repository';
import { PRRepository } from './repositories/pr.repository';

@Module({
  imports: [HttpModule],
  providers: [
    ProjectRepository,
    PRRepository,
    GithubPRRepository,
    GithubProjectRepository
  ],
  exports: [ProjectRepository, PRRepository]
})
export class PmpApiProjectDataAccessModule {}
