import { Module } from '@nestjs/common';
import {
  pmpApiServiceConfig,
  PmpApiServiceConfigService
} from './configs/pmp-api-service.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'libs/pmp-api/shared/config/src/lib/.env',
      load: [pmpApiServiceConfig],
      isGlobal: true
    })
  ],
  exports: [PmpApiServiceConfigService],
  providers: [PmpApiServiceConfigService]
})
export class PmpApiSharedConfigModule {}
