import { Global, HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { GithubAuthInterceptor } from './github/interceptors/github-auth.interceptor';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TypeOrmRootModule } from './type-orm/type-orm-root.module';

@Global()
@Module({
  imports: [ConfigModule, HttpModule, TypeOrmRootModule],
  providers: [GithubAuthInterceptor],
  exports: [ConfigModule, HttpModule, TypeOrmRootModule, GithubAuthInterceptor]
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
