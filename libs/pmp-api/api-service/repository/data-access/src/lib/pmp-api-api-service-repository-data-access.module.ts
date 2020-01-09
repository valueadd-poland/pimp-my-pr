import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { RepositoryDataService } from './repositories/repository.data-service';
import { PrDataService } from './repositories/pr.data-service';
import { PmpApiSharedConfigModule } from '@pimp-my-pr/pmp-api/shared/config';
import { AxiosRequestConfig } from 'axios';
import { GithubAuthInterceptor } from './interceptors/github-auth.interceptor';

@Module({
  imports: [HttpModule, PmpApiSharedConfigModule],
  providers: [RepositoryDataService, PrDataService, GithubAuthInterceptor],
  exports: [RepositoryDataService, PrDataService]
})
export class PmpApiApiServiceRepositoryDataAccessModule implements OnModuleInit {
  constructor(
    private httpService: HttpService,
    private githubAuthInterceptor: GithubAuthInterceptor
  ) {}

  public onModuleInit(): void {
    this.httpService.axiosRef.interceptors.request.use((req: AxiosRequestConfig) =>
      this.githubAuthInterceptor.intercept(req)
    );
  }
}
