import { Global, Module } from '@nestjs/common';
import { PmpApiProjectApiModule } from '@pimp-my-pr/pmp-api/project/api';

@Global()
@Module({
  imports: [PmpApiProjectApiModule]
})
export class PmpApiProjectShellModule {}
