import { HttpModule, Module } from '@nestjs/common';
import { FeatureUserTypeOrmModule } from './feature-user-type-orm.module';
import { BitbucketUserRepository } from './repositories/bitbucket/bitbucket-user.repository';
import { GithubUserRepository } from './repositories/github/github-user.repository';
import { UserRepositoryAdapter } from './repositories/user-repository.adapter';

const providers = [UserRepositoryAdapter, GithubUserRepository, BitbucketUserRepository];

@Module({
  imports: [HttpModule, FeatureUserTypeOrmModule],
  providers: providers,
  exports: [FeatureUserTypeOrmModule, ...providers]
})
export class ServerUserInfrastructureModule {}
