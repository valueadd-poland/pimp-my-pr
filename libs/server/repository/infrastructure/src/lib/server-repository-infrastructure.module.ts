import { Module } from '@nestjs/common';
import { BitbucketRepositoryRepository } from './bitbucket/repositories/bitbucket-repository.repository';
import { GithubRepositoryRepository } from './github/repositories/github-repository.repository';
import { RepositoryRepositoryAdapter } from './repositories/repository-repository.adapter';
import { FeatureRepositoryTypeOrmModule } from './typeorm/feature-repository-type-orm.module';

@Module({
  imports: [FeatureRepositoryTypeOrmModule],
  providers: [
    RepositoryRepositoryAdapter,
    BitbucketRepositoryRepository,
    GithubRepositoryRepository
  ],
  exports: [
    FeatureRepositoryTypeOrmModule,
    BitbucketRepositoryRepository,
    GithubRepositoryRepository
  ]
})
export class ServerRepositoryInfrastructureModule {}
