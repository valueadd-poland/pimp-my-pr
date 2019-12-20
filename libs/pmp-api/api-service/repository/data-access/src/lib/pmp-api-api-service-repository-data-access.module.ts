import { HttpModule, Module } from '@nestjs/common';
import { RepositoryDataService } from './repositories/repository.data-service';
import { PrDataService } from './repositories/pr.data-service';
import { PmpApiSharedConfigModule } from '@pimp-my-pr/pmp-api/shared/config';

@Module({
  imports: [HttpModule, PmpApiSharedConfigModule],
  providers: [RepositoryDataService, PrDataService],
  exports: [RepositoryDataService, PrDataService]
})
export class PmpApiApiServiceRepositoryDataAccessModule {}
