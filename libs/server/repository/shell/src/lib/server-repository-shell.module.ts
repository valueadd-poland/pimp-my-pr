import { Module } from '@nestjs/common';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';

@Module({ imports: [ServerRepositoryApiRestModule] })
export class ServerRepositoryShellModule {}
