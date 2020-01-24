import { Controller, Get, Req } from '@nestjs/common';
import { RepositoryFacade } from '@pimp-my-pr/pmp-api/api-service/repository/core';
import { ListRepositoriesResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { Request } from 'express';
import { ListReviewerStatisticsRequest } from '../requests/list-reviewer-statistics.request';
import { SingleUserStatisticsReadModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { ListSingleRepositoryRequest } from '../requests/list-single-repository.request';

@Controller('repository')
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get()
  list(): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.list();
  }

  @Get(':repositoryId')
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
  listReviewerStatistics(@Req() request: Request): Promise<SingleUserStatisticsReadModel> {
    return this.repositoryFacade.listReviewerStatistics(
      new ListReviewerStatisticsRequest(request).getParams()
    );
  }
}
