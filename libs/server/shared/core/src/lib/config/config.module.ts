import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { pmpApiConfigService, PmpApiConfigService } from './pmp-api-config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [pmpApiConfigService],
      isGlobal: true
    })
  ],
  exports: [PmpApiConfigService],
  providers: [PmpApiConfigService]
})
export class ConfigModule {}
