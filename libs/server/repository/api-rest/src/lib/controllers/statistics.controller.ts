import { Controller, Get, Req } from '@nestjs/common';
import {
  RepositoryFacade,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { ListRepositoriesResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { Request } from 'express';
import { ListReviewerStatisticsRequest } from '../requests/list-reviewer-statistics.request';
import { ListSingleRepositoryRequest } from '../requests/list-single-repository.request';

@Controller('statistics')
export class StatisticsController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get('repository')
  list(): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.listRepositoriesStatistics();
  }

  @Get('repository/:repositoryId')
  listSingleRepository(@Req() request: Request): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.getRepositoryStatistics(
      new ListSingleRepositoryRequest(request).getParams()
    );
  }

  @Get('reviewers')
  listReviewers(): Promise<UserStatistics[]> {
    return this.repositoryFacade.listReviewersStatistics();
  }

  @Get('reviewers/:username')
  listReviewerStatistics(@Req() request: Request): Promise<ReviewerStatisticsReadModel> {
    return this.repositoryFacade.getReviewerStatistics(
      new ListReviewerStatisticsRequest(request).getParams()
    );
  }
}
