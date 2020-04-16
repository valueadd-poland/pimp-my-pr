import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schema/user.schema';

const featureModule = TypeOrmModule.forFeature([UserSchema as any]);
@Module({
  imports: [featureModule],
  exports: [featureModule]
})
export class FeatureUserTypeOrmModule {}
