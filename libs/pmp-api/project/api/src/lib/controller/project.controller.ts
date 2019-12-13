import { Controller, Get } from '@nestjs/common';
import { ProjectFacade } from '@pimp-my-pr/pmp-api/project/core';

@Controller('project')
export class ProjectController {
  constructor(private projectFacade: ProjectFacade) {}
  @Get('sync')
  sync(): Promise<void> {
    return this.projectFacade.sync();
  }
}
