import { Global, HttpModule, Module } from '@nestjs/common';

import { ConfigModule } from './modules/config.module';
import { TypeOrmRootModule } from './modules/type-orm-root.module';
import { QueueModule } from './modules/queue-module';

@Global()
@Module({
  imports: [ConfigModule, HttpModule, TypeOrmRootModule, QueueModule],
  exports: [ConfigModule, HttpModule]
})
export class ServerSharedCoreModule {}
