import { Global, HttpService, Module } from '@nestjs/common';
import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import {
  PrRepository,
  RepositoryRepository,
  ReviewerRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import {
  RemoteRepositoryRepository,
  RepositoryRepositoryAdapter,
  ServerRepositoryInfrastructureModule
} from '@pimp-my-pr/server/repository/infrastructure';
import { FeatureRepositoryTypeOrmModule } from './feature-repository-type-orm.module';
import { PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { prRepositoryFactory } from './factories/pr-repository.factory';
import { remoteRepositoryRepositoryFactory } from './factories/remote-repository-repository.factory';
import { reviewerRepositoryFactory } from './factories/reviewer-repository.factory';

const providers = [
  {
    provide: PrRepository,
    useFactory: prRepositoryFactory,
    inject: [PmpApiConfigService, HttpService]
  },
  {
    provide: RemoteRepositoryRepository,
    useFactory: remoteRepositoryRepositoryFactory,
    inject: [PmpApiConfigService, HttpService]
  },
  {
    provide: ReviewerRepository,
    useFactory: reviewerRepositoryFactory,
    inject: [PmpApiConfigService, HttpService]
  },
  {
    provide: RepositoryRepository,
    useClass: RepositoryRepositoryAdapter
  }
];

@Global()
@Module({
  imports: [
    FeatureRepositoryTypeOrmModule,
    ServerRepositoryInfrastructureModule,
    ServerRepositoryCoreApplicationServicesModule
  ],
  providers: providers,
  exports: [
    FeatureRepositoryTypeOrmModule,
    ...providers,
    ServerRepositoryCoreApplicationServicesModule
  ]
})
export class ServerRepositoryShellModule {}
