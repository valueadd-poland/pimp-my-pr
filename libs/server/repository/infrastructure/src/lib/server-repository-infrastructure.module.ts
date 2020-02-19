import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { AxiosRequestConfig } from 'axios';
import { GithubAuthInterceptor } from './interceptors/github-auth.interceptor';
import { PrDataService } from './repositories/pr.data-service';
import { RepositoryDataService } from './repositories/repository.data-service';
import { UserDataService } from './repositories/user.data-service';

@Module({
  imports: [HttpModule, ServerSharedCoreModule],
  providers: [RepositoryDataService, PrDataService, UserDataService, GithubAuthInterceptor],
  exports: [RepositoryDataService, PrDataService, UserDataService]
})
export class ServerRepositoryInfrastructureModule implements OnModuleInit {
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
