import { PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { HttpService } from '@nestjs/common';
import {
  BitbucketPrRepository,
  GithubPrRepository
} from '@pimp-my-pr/server/repository/infrastructure';

export const prRepositoryFactory = (
  configService: PmpApiConfigService,
  httpService: HttpService
) => {
  if (configService.getBitbucketToken()) {
    return new BitbucketPrRepository(httpService);
  }
  if (configService.getGithubToken()) {
    return new GithubPrRepository(httpService);
  }

  throw new Error('No PR repository initialized');
};
