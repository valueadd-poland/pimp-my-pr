import { Global, HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { ConfigModule } from './config/config.module';
import { AuthInterceptor } from './auth.interceptor';
import { TypeOrmRootModule } from './type-orm/type-orm-root.module';
import { PmpApiConfigService } from './config/pmp-api-config.service';
import { authInterceptorFactory } from './auth.interceptor.factory';

@Global()
@Module({
  imports: [ConfigModule, HttpModule, TypeOrmRootModule],
  providers: [
    {
      provide: AuthInterceptor,
      useFactory: authInterceptorFactory,
      inject: [PmpApiConfigService, HttpService]
    }
  ],
  exports: [ConfigModule, HttpModule, AuthInterceptor]
})
export class ServerSharedCoreModule implements OnModuleInit {
  constructor(private httpService: HttpService, private interceptor: AuthInterceptor) {}

  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.request.use((req: AxiosRequestConfig) =>
      this.interceptor.intercept(req)
    );
  }
}
