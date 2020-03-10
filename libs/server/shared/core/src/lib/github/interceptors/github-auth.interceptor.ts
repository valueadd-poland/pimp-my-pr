import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { PmpApiConfigService } from '../../config/pmp-api-config.service';
import { AuthInterceptor } from '../../auth.interceptor';

@Injectable()
export class GithubAuthInterceptor extends AuthInterceptor {
  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiConfigService
  ) {
    super();
  }

  intercept(req: AxiosRequestConfig): AxiosRequestConfig {
    req.headers = {
      Authorization: 'token ' + this.pmpApiServiceConfigService.getGithubToken(),
      ...req.headers
    };
    return req;
  }
}
