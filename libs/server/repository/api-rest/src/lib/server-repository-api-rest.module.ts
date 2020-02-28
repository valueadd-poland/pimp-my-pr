import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RepositoryController } from './controllers/repository.controller';
import { HttpExceptionFilter } from './exception-filters/http.exception-filter';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';
import { ServerRepositoryShellModule } from '@pimp-my-pr/server/repository/shell';
import { StatisticsController } from './controllers/statistics.controller';

@Module({
  imports: [ServerRepositoryShellModule],
  controllers: [RepositoryController, StatisticsController],
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
