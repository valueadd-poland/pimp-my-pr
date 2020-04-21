import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { pmpApiConfigService, PmpApiConfigService } from '@pimp-my-pr/server/shared/config';

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
