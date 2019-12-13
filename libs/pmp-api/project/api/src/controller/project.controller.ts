import { Controller, Get } from '@nestjs/common';

@Controller('project')
export class ProjectController {
  @Get('sync')
  sync(): any {
    return {};
  }
}
