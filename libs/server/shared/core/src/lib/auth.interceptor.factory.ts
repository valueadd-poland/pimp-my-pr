import { PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { HttpService } from '@nestjs/common';
import { BitbucketAuthInterceptor } from './bitbucket/interceptors/bitbucket-auth.interceptor';

export const authInterceptorFactory = (
  configService: PmpApiConfigService,
  httpService: HttpService
) => {
  if (configService.getBitbucketToken()) {
    return new BitbucketAuthInterceptor(httpService, configService);
  }
};
