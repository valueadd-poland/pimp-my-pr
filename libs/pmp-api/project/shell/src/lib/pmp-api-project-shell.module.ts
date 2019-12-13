import { Module } from '@nestjs/common';
import { PmpApiProjectApiModule } from '@pimp-my-pr/pmp-api/project/api';

@Module({
  imports: [PmpApiProjectApiModule]
})
export class PmpApiProjectShellModule {}
