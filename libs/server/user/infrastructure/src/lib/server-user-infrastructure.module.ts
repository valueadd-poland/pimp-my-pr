import { Module } from '@nestjs/common';
import { FeatureUserTypeOrmModule } from './feature-user-type-orm.module';
import { BitbucketUserRepository } from './repositories/bitbucket/bitbucket-user.repository';
import { GithubUserRepository } from './repositories/github/github-user.repository';
import { GitlabUserRepository } from './repositories/gitlab/gitlab-user.repository';
import { UserRepositoryAdapter } from './repositories/user-repository.adapter';

const providers = [
  UserRepositoryAdapter,
  GithubUserRepository,
  BitbucketUserRepository,
  GitlabUserRepository
];

@Module({
  imports: [FeatureUserTypeOrmModule],
  providers: providers,
  exports: [FeatureUserTypeOrmModule, ...providers]
})
export class ServerUserInfrastructureModule {}
