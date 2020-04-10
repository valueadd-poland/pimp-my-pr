import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  RepositoriesStatisticsItemReadModel,
  RepositoryFacade,
  ReviewersStatisticsItemReadModel,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { ListRepositoriesResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { AuthGuard, Credentials, RequestCredentials } from '@pimp-my-pr/server/auth/public';

@ApiTags('statistics')
@Controller('statistics')
@UseGuards(AuthGuard)
export class StatisticsController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @Get('repository')
  list(@Credentials() credentials: RequestCredentials): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.listRepositoriesStatistics(
      credentials.token,
      credentials.platform
    );
  }

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @Get('repository/:repositoryId')
  listSingleRepository(
    @Param('repositoryId') repositoryId: string,
    @Credentials() credentials: RequestCredentials
  ): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.getRepositoryStatistics(
      repositoryId,
      credentials.token,
      credentials.platform
    );
  }

  @ApiOkResponse({ type: [ReviewersStatisticsItemReadModel] })
  @Get('reviewers')
  listReviewers(@Credentials() credentials: RequestCredentials): Promise<UserStatistics[]> {
    return this.repositoryFacade.listReviewersStatistics(credentials.token, credentials.platform);
  }

  @ApiOkResponse({ type: [ReviewerStatisticsReadModel] })
  @Get('reviewers/:username')
  listReviewerStatistics(
    @Param('username') username: string,
    @Credentials() credentials: RequestCredentials
  ): Promise<ReviewerStatisticsReadModel> {
    return this.repositoryFacade.getReviewerStatistics(
      username,
      credentials.token,
      credentials.platform
    );
  }
}
