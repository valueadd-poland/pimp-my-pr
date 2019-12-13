import { Global, Module } from '@nestjs/common';
import { PmpApiProjectApiModule } from '@pimp-my-pr/pmp-api/project/api';
import { PmpApiProjectDataAccessModule } from '@pimp-my-pr/pmp-api/project/data-access';

@Global()
@Module({
  imports: [PmpApiProjectApiModule, PmpApiProjectDataAccessModule]
})
export class PmpApiProjectShellModule {}
