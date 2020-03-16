import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  RepositoriesStatisticsItemReadModel,
  RepositoryFacade,
  ReviewersStatisticsItemReadModel,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { ListRepositoriesResponse, UserStatistics } from '@pimp-my-pr/shared/domain';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @Get('repository')
  list(): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.listRepositoriesStatistics();
  }

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @Get('repository/:repositoryId')
  listSingleRepository(
    @Param('repositoryId') repositoryId: string
  ): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.getRepositoryStatistics({ repositoryId });
  }

  @ApiOkResponse({ type: [ReviewersStatisticsItemReadModel] })
  @Get('reviewers')
  listReviewers(): Promise<UserStatistics[]> {
    return this.repositoryFacade.listReviewersStatistics();
  }

  @ApiOkResponse({ type: [ReviewerStatisticsReadModel] })
  @Get('reviewers/:username')
  listReviewerStatistics(
    @Param('username') username: string
  ): Promise<ReviewerStatisticsReadModel> {
    return this.repositoryFacade.getReviewerStatistics({ username });
  }
}
