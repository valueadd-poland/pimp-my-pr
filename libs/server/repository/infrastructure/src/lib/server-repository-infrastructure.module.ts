import { Module } from '@nestjs/common';
import { RepositoryRepositoryAdapter } from './repositories/repository-repository.adapter';
import { RemoteRepositoryRepository } from './repositories/remote-repository.repository';
import { BitbucketRepositoryRepository } from './bitbucket/repositories/bitbucket-repository.repository';
import { GithubRepositoryRepository } from './github/repositories/github-repository.repository';

@Module({
  providers: [
    RepositoryRepositoryAdapter,
    BitbucketRepositoryRepository,
    GithubRepositoryRepository
  ],
  exports: [BitbucketRepositoryRepository, GithubRepositoryRepository]
})
export class ServerRepositoryInfrastructureModule {}
