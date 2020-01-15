import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { RepositoryDataService } from './repositories/repository.data-service';
import { PrDataService } from './repositories/pr.data-service';
import { PmpApiSharedConfigModule } from '@pimp-my-pr/pmp-api/shared/config';
import { AxiosRequestConfig } from 'axios';
import { GithubAuthInterceptor } from './interceptors/github-auth.interceptor';
import { UserDataService } from './repositories/user.data-service';

@Module({
  imports: [HttpModule, PmpApiSharedConfigModule],
  providers: [RepositoryDataService, PrDataService, UserDataService, GithubAuthInterceptor],
  exports: [RepositoryDataService, PrDataService, UserDataService]
})
export class PmpApiApiServiceRepositoryDataAccessModule implements OnModuleInit {
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
