import { Global, HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { GithubAuthInterceptor } from './github/interceptors/github-auth.interceptor';
import { AxiosRequestConfig } from 'axios';

@Global()
@Module({
  imports: [ConfigModule, HttpModule],
  providers: [GithubAuthInterceptor],
  exports: [ConfigModule, HttpModule, GithubAuthInterceptor]
})
export class ServerSharedCoreModule implements OnModuleInit {
  constructor(
    private httpService: HttpService,
    private githubAuthInterceptor: GithubAuthInterceptor
  ) {}

  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.request.use((req: AxiosRequestConfig) =>
      this.githubAuthInterceptor.intercept(req)
    );
  }
}
