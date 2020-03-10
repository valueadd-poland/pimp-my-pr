import { PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { HttpService } from '@nestjs/common';
import {
  BitbucketReviewerRepository,
  GithubReviewerRepository
} from '@pimp-my-pr/server/repository/infrastructure';

export const reviewerRepositoryFactory = (
  configService: PmpApiConfigService,
  httpService: HttpService
) => {
  if (configService.getBitbucketToken()) {
    return new BitbucketReviewerRepository(httpService);
  }
  if (configService.getGithubToken()) {
    return new GithubReviewerRepository(httpService);
  }

  throw new Error('No Reviewer repository initialized');
};
