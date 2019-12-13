import { Module } from '@nestjs/common';
import { ProjectController } from '../controller/project.controller';

@Module({
  controllers: [ProjectController]
})
export class PmpApiProjectApiModule {}
