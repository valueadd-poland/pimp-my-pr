import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard, Credentials, RequestCredentials } from '@pimp-my-pr/server/auth/public';
import {
  GetPrTimelineQuery,
  PrTimelineReadModel,
  TimelineFacade
} from '@pimp-my-pr/server/repository/core/application-services';
import { GenerateTimelineDto } from '../dtos/generate-timeline.dto';
import { decreaseDateByTimelineStep } from '@pimp-my-pr/server/repository/util';
import { TimelineStep } from '@pimp-my-pr/shared/domain';

@ApiTags('timeline')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('timeline')
export class TimelineController {
  constructor(private timelineFacade: TimelineFacade) {}

  @ApiOkResponse({ type: [PrTimelineReadModel] })
  @Get('pr/:repositoryId')
  generateTimeline(
    @Credentials() credentials: RequestCredentials,
    @Param('repositoryId') repositoryId: string,
    @Query() query: GenerateTimelineDto
  ): Promise<PrTimelineReadModel> {
    return this.timelineFacade.getPrTimeLine(
      new GetPrTimelineQuery(
        query.step,
        query.timelineFrom,
        query.timelineTo,
        credentials.token,
        repositoryId,
        credentials.platform,
        // TODO: Find a better solution to handle this problem
        decreaseDateByTimelineStep(query.timelineFrom, TimelineStep.MONTH, 3)
      )
    );
  }
}
