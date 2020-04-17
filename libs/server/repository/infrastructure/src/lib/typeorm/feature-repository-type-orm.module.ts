import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositorySchema } from './schema/repository.schema';

const featureModule = TypeOrmModule.forFeature([RepositorySchema as any]);
@Module({
  imports: [featureModule],
  exports: [featureModule]
})
export class FeatureRepositoryTypeOrmModule {}
