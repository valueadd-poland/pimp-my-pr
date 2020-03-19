import { Controller, Get, Param, UseGuards, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  RepositoriesStatisticsItemReadModel,
  RepositoryFacade,
  ReviewersStatisticsItemReadModel,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { ListRepositoriesResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { AuthGuard } from '@pimp-my-pr/server/auth/public';

@ApiTags('statistics')
@Controller('statistics')
@UseGuards(AuthGuard)
export class StatisticsController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @Get('repository')
  list(@Res() res: Response): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.listRepositoriesStatistics(res.locals.token, res.locals.platform);
  }

  @ApiOkResponse({ type: [RepositoriesStatisticsItemReadModel] })
  @Get('repository/:repositoryId')
  listSingleRepository(
    @Param('repositoryId') repositoryId: string,
    @Res() res: Response
  ): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.getRepositoryStatistics(
      repositoryId,
      res.locals.token,
      res.locals.platform
    );
  }

  @ApiOkResponse({ type: [ReviewersStatisticsItemReadModel] })
  @Get('reviewers')
  listReviewers(@Res() res: Response): Promise<UserStatistics[]> {
    return this.repositoryFacade.listReviewersStatistics(res.locals.token, res.locals.platform);
  }

  @ApiOkResponse({ type: [ReviewerStatisticsReadModel] })
  @Get('reviewers/:username')
  listReviewerStatistics(
    @Param('username') username: string,
    @Res() res: Response
  ): Promise<ReviewerStatisticsReadModel> {
    return this.repositoryFacade.getReviewerStatistics(
      username,
      res.locals.token,
      res.locals.platform
    );
  }
}
