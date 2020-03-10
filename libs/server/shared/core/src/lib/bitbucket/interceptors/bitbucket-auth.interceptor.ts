import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { AuthInterceptor } from '../../auth.interceptor';
import { PmpApiConfigService } from '../../config/pmp-api-config.service';

@Injectable()
export class BitbucketAuthInterceptor extends AuthInterceptor {
  constructor(private httpService: HttpService, private pmpApiConfigService: PmpApiConfigService) {
    super();
  }

  intercept(req: AxiosRequestConfig): AxiosRequestConfig {
    req.headers = {
      Authorization: 'Bearer ' + this.pmpApiConfigService.getBitbucketToken(),
      ...req.headers,
      ['Content-Type']: 'application/json'
    };
    return req;
  }
}
