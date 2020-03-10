import { PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { HttpService } from '@nestjs/common';
import {
  BitbucketRepositoryRepository,
  GithubRepositoryRepository,
  RemoteRepositoryRepository
} from '@pimp-my-pr/server/repository/infrastructure';

export const remoteRepositoryRepositoryFactory = (
  configService: PmpApiConfigService,
  httpService: HttpService
): RemoteRepositoryRepository => {
  if (configService.getBitbucketToken()) {
    return new BitbucketRepositoryRepository(httpService);
  }
  if (configService.getGithubToken()) {
    return new GithubRepositoryRepository(httpService);
  }

  throw new Error('No remote repository repository initialized');
};
