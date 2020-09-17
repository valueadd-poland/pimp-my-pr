import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddRepositoryHandler } from './commands/add-repository/add-repository.handler';
import { GetRepositoryStatisticsHandler } from './queries/get-repository-statistics/get-repository-statistics.handler';
import { GetReviewerStatisticsHandler } from './queries/get-reviewer-statistics/get-reviewer-statistics.handler';
import { ListRepositoriesStatisticsHandler } from './queries/list-repositories-statistics/list-repositories-statistics.handler';
import { ListRepositoriesHandler } from './queries/list-repositories/list-repositories.handler';
import { ListReviewersStatisticsHandler } from './queries/list-reviewers-statistics/list-reviewers-statistics.handler';
import { RepositoryFacade } from './repository.facade';
import { DeleteRepositoryHandler } from './commands/delete-repository/delete-repository.handler';
import { EditRepositoryHandler } from './commands/edit-repository/edit-repository.handler';
import { GetSingleRepositoryDataHandler } from './queries/get-single-repository-data/get-single-repository-data.handler';
import { GetPrTimelineHandler } from './queries/get-pr-timeline/get-pr-timeline.handler';
import { TimelineFacade } from './timeline.facade';
import { GetUserSettingsHandler } from './queries/get-user-settings/get-user-settings.handler';
import { DeleteSettingHandler } from './commands/delete-setting/delete-setting.handler';
import { SettingsFacade } from './settings.facade';
import { EditSettingsHandler } from './commands/edit-settings/edit-settings.handler';
import { UserAddedEventHandler } from './events/user-added/user-added.event-handler';

const QueryHandlers = [
  AddRepositoryHandler,
  DeleteRepositoryHandler,
  EditRepositoryHandler,
  GetRepositoryStatisticsHandler,
  GetReviewerStatisticsHandler,
  GetSingleRepositoryDataHandler,
  ListRepositoriesStatisticsHandler,
  ListReviewersStatisticsHandler,
  ListRepositoriesHandler,
  GetPrTimelineHandler,
  ListRepositoriesHandler,
  GetUserSettingsHandler,
  DeleteSettingHandler,
  EditSettingsHandler,
  UserAddedEventHandler
];

@Module({
  imports: [CqrsModule],
  providers: [RepositoryFacade, SettingsFacade, TimelineFacade, ...QueryHandlers],
  exports: [RepositoryFacade, TimelineFacade, SettingsFacade]
})
export class ServerRepositoryCoreApplicationServicesModule {}
