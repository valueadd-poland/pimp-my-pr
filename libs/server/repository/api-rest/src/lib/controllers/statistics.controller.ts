import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthGuard,
  Credentials,
  CurrentUserId,
  RequestCredentials
} from '@pimp-my-pr/server/auth/public';
import {
  RepositoriesStatisticsItemReadModel,
  RepositoryFacade,
  ReviewersStatisticsItemReadModel,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { ListRepositoriesResponse, ReviewerStatistics } from '@pimp-my-pr/shared/domain';
import { UserRepositoryGuard } from '../guards/user-repository.guard';

@ApiTags('statistics')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('statistics')
export class StatisticsController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @Get('repository')
  listRepositories(
    @Credentials() credentials: RequestCredentials,
    @CurrentUserId() currentUserId: string
  ): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.listRepositoriesStatistics(
      credentials.token,
      credentials.platform,
      currentUserId
    );
  }

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @UseGuards(UserRepositoryGuard)
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
  listReviewers(
    @Credentials() credentials: RequestCredentials,
    @CurrentUserId() currentUserId: string
  ): Promise<ReviewerStatistics[]> {
    return this.repositoryFacade.listReviewersStatistics(
      credentials.token,
      credentials.platform,
      currentUserId
    );
  }

  @ApiOkResponse({ type: [ReviewerStatisticsReadModel] })
  @Get('reviewers/:username')
  listReviewerStatistics(
    @Param('username') username: string,
    @Credentials() credentials: RequestCredentials,
    @CurrentUserId() currentUserId: string
  ): Promise<ReviewerStatisticsReadModel> {
    return this.repositoryFacade.getReviewerStatistics(
      username,
      credentials.token,
      credentials.platform,
      currentUserId
    );
  }
}
