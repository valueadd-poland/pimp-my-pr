import { Module } from '@nestjs/common';
import { PmpApiApiServiceShellModule } from '@pimp-my-pr/pmp-api/api-service/shell';

@Module({
  imports: [PmpApiApiServiceShellModule]
})
export class AppModule {}
