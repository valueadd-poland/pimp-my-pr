import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { PmpApiServiceConfigService } from '../../config/pmp-api-service.config';

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
