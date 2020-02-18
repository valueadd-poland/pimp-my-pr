import { HttpService, Injectable } from '@nestjs/common';
import { PmpApiServiceConfigService } from '@pimp-my-pr/server/shared/core';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class GithubAuthInterceptor {
  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {}

  intercept(req: AxiosRequestConfig): AxiosRequestConfig {
    req.headers = {
      Authorization: 'token ' + this.pmpApiServiceConfigService.getGithubToken(),
      ...req.headers
    };
    return req;
  }
}
