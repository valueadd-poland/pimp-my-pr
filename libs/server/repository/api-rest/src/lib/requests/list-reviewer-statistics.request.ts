import { Request } from 'express';
import { ListReviewerStatisticsParams } from '@pimp-my-pr/shared/domain';
import { BadRequestException } from '@nestjs/common';

export class ListReviewerStatisticsRequest {
  constructor(private request: Request) {}

  getParams(): ListReviewerStatisticsParams {
    if (!this.request.params || !this.request.params.username) {
      throw new BadRequestException('Missing username parameter');
    }

    return { username: this.request.params.username };
  }
}
