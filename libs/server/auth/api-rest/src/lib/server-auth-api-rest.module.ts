import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ServerAuthShellModule } from '@pimp-my-pr/server/auth/shell';

@Module({
  imports: [ServerAuthShellModule],
  controllers: [AuthController]
})
export class ServerAuthApiRestModule {}
