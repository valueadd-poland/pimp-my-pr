import { Global, Module } from '@nestjs/common';
import { PmpApiConfigService } from '@pimp-my-pr/server/shared/config';
import { BullModule } from '@nestjs/bull';

const bull = BullModule.forRootAsync({
  useFactory: async (configService: PmpApiConfigService) => {
    const { host, port } = configService.getRedisConfig();
    return {
      redis: {
        host: host,
        port: Number(port)
      }
    };
  },
  inject: [PmpApiConfigService]
});

@Global()
@Module({
  imports: [bull],
  exports: [bull]
})
export class QueueModule {}
