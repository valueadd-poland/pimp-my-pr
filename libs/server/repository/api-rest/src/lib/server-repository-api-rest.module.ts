import { Module } from '@nestjs/common';
import { RepositoryController } from './controllers/repository.controller';
import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './exception-filters/http.exception-filter';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

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
