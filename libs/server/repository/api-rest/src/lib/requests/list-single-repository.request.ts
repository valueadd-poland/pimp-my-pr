import { BadRequestException } from '@nestjs/common';
import { ListSingleRepositoryParams } from '@pimp-my-pr/shared/domain';
import { Request } from 'express';

export class ListSingleRepositoryRequest {
  constructor(private request: Request) {}

  getParams(): ListSingleRepositoryParams {
    if (!this.request.params || !this.request.params.repositoryId) {
      throw new BadRequestException('Missing repositoryId parameter');
    }

    return { repositoryId: this.request.params.repositoryId };
  }
}
