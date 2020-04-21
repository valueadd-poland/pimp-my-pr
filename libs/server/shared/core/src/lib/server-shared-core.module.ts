import { Global, HttpModule, Module } from '@nestjs/common';

import { ConfigModule } from './modules/config.module';
import { TypeOrmRootModule } from './modules/type-orm-root.module';

@Global()
@Module({
  imports: [ConfigModule, HttpModule, TypeOrmRootModule],
  exports: [ConfigModule, HttpModule]
})
export class ServerSharedCoreModule {}
