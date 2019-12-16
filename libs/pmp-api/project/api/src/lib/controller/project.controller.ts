import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProjectFacade } from '@pimp-my-pr/pmp-api/project/core';

@Controller('project')
export class ProjectController {
  constructor(private projectFacade: ProjectFacade) {}
  @Get('sync')
  sync(@Res() res: Response): void {
    //ToDo notify after synchronization is done
    this.projectFacade.sync();
    res.status(HttpStatus.OK).send();
  }
}
