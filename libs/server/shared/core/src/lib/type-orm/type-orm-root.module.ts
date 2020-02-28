import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { PmpApiConfigService } from '../config/pmp-api-config.service';

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: PmpApiConfigService) => {
    const { host, name, password, user } = configService.getDbConfig();
    return {
      type: 'postgres' as 'postgres',
      host,
      port: 5432,
      username: user,
      password,
      database: name,
      autoLoadEntities: true,
      synchronize: true
    };
  },
  inject: [PmpApiConfigService]
});

@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule]
})
export class TypeOrmRootModule {}
