import { Module } from '@nestjs/common';
import { ProjectController } from './controller/project.controller';
import { PmpApiProjectCoreModule } from '@pimp-my-pr/pmp-api/project/core';

@Module({
  imports: [PmpApiProjectCoreModule],
  controllers: [ProjectController]
})
export class PmpApiProjectApiModule {}
