import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { PmpApiConfigService } from '../../config/pmp-api-config.service';

@Injectable()
export class GithubAuthInterceptor {
  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiConfigService
  ) {}

  intercept(req: AxiosRequestConfig): AxiosRequestConfig {
    req.headers = {
      Authorization: 'token ' + this.pmpApiServiceConfigService.getGithubToken(),
      ...req.headers
    };
    return req;
  }
}
