import { Controller, Get, Req } from '@nestjs/common';
import { RepositoryFacade } from '@pimp-my-pr/server/repository/core/application-services';
import { ListRepositoriesResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { Request } from 'express';
import { ListReviewerStatisticsRequest } from '../requests/list-reviewer-statistics.request';
import { ReviewerStatisticsReadModel } from '@pimp-my-pr/server/repository/core/domain';
import { ListSingleRepositoryRequest } from '../requests/list-single-repository.request';

@Controller()
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get('repository')
  list(): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.list();
  }

  @Get('repository/:repositoryId')
  listSingleRepository(@Req() request: Request): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.listSingleRepository(
      new ListSingleRepositoryRequest(request).getParams()
    );
  }

  @Get('contributors')
  listContributors(): Promise<UserStatistics[]> {
    return this.repositoryFacade.listContributors();
  }

  @Get('reviewers')
  listReviewers(): Promise<UserStatistics[]> {
    return this.repositoryFacade.listReviewers();
  }

  @Get('reviewers/:username')
  listReviewerStatistics(@Req() request: Request): Promise<ReviewerStatisticsReadModel> {
    return this.repositoryFacade.listReviewerStatistics(
      new ListReviewerStatisticsRequest(request).getParams()
    );
  }
}
