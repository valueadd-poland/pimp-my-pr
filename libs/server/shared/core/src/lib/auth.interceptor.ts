import { AxiosRequestConfig } from 'axios';

export abstract class AuthInterceptor {
  abstract intercept(req: AxiosRequestConfig): AxiosRequestConfig;
}
