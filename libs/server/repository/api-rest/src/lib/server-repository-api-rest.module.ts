import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import { RepositoryController } from './controllers/repository.controller';
import { HttpExceptionFilter } from './exception-filters/http.exception-filter';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';

@Module({
  imports: [ServerRepositoryCoreApplicationServicesModule],
  controllers: [RepositoryController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor
    }
  ]
})
export class ServerRepositoryApiRestModule {}
