import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositorySchema } from './schema/repository.schema';
import { SettingsSchema } from './schema/settings.schema';
import { ContributorSchema } from './schema/contributor.schema';
import { PrSchema } from './schema/pr.schema';

const featureModule = TypeOrmModule.forFeature([
  RepositorySchema as any,
  SettingsSchema as any,
  ContributorSchema as any,
  PrSchema as any
]);
@Module({
  imports: [featureModule],
  exports: [featureModule]
})
export class FeatureRepositoryTypeOrmModule {}
