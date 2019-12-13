import { Module } from '@nestjs/common';
import { ProjectRepositoryImpl } from './repositories/project.repository-impl';

@Module({
  providers: [ProjectRepositoryImpl],
  exports: [ProjectRepositoryImpl]
})
export class PmpApiProjectDataAccessModule {}
