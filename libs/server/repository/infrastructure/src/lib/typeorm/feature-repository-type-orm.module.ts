import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositorySchema } from './schema/repository.schema';
import { SettingsSchema } from './schema/settings.schema';

const featureModule = TypeOrmModule.forFeature([RepositorySchema, SettingsSchema]);
@Module({
  imports: [featureModule],
  exports: [featureModule]
})
export class FeatureRepositoryTypeOrmModule {}
