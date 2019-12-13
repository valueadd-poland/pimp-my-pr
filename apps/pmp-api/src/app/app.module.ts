import { Module } from '@nestjs/common';
import { PmpApiProjectShellModule } from '@pimp-my-pr/pmp-api/project/shell';

@Module({
  imports: [PmpApiProjectShellModule]
})
export class AppModule {}
