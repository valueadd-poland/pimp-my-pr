import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

const featureModule = TypeOrmModule.forFeature([RepositoryEntity]);
@Module({
  imports: [featureModule],
  exports: [featureModule]
})
export class FeatureRepositoryTypeOrmModule {}
