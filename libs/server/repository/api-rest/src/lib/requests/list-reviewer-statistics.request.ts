import { BadRequestException } from '@nestjs/common';
import { ListReviewerStatisticsParams } from '@pimp-my-pr/shared/domain';
import { Request } from 'express';

export class ListReviewerStatisticsRequest {
  constructor(private request: Request) {}

  getParams(): ListReviewerStatisticsParams {
    if (!this.request.params || !this.request.params.username) {
      throw new BadRequestException('Missing username parameter');
    }

    return { username: this.request.params.username };
  }
}
