import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { pmpApiServiceConfig, PmpApiServiceConfigService } from './pmp-api-service.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: 'libs/server/shared/core/src/lib/config/.env-sample',
      load: [pmpApiServiceConfig],
      isGlobal: true
    })
  ],
  exports: [PmpApiServiceConfigService],
  providers: [PmpApiServiceConfigService]
})
export class ConfigModule {}
