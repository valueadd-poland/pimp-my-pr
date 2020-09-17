import { Module } from '@nestjs/common';
import { ServerRepositoryShellModule } from '@pimp-my-pr/server/repository/shell';
import { RepositoryController } from './controllers/repository.controller';
import { StatisticsController } from './controllers/statistics.controller';
import { UserRepositoryGuard } from './guards/user-repository.guard';
import { TimelineController } from './controllers/timeline.controller';
import { SettingsController } from './controllers/settings.controller';

@Module({
  imports: [ServerRepositoryShellModule],
  controllers: [RepositoryController, StatisticsController, TimelineController, SettingsController],
  providers: [UserRepositoryGuard]
})
export class ServerRepositoryApiRestModule {}
