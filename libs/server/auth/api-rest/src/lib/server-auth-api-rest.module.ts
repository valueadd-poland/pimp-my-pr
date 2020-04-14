import { Module } from '@nestjs/common';
import { ServerAuthShellModule } from '@pimp-my-pr/server/auth/shell';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [ServerAuthShellModule],
  controllers: [AuthController]
})
export class ServerAuthApiRestModule {}
