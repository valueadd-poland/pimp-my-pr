import { HttpModule, Module } from '@nestjs/common';
import { ProjectRepositoryImpl } from './repositories/project.repository-impl';
import { GithubProjectRepository } from './repositories/github-project.repository';

@Module({
  imports: [HttpModule],
  providers: [ProjectRepositoryImpl, GithubProjectRepository],
  exports: [ProjectRepositoryImpl, GithubProjectRepository]
})
export class PmpApiProjectDataAccessModule {}
