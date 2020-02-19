import { NotImplementedException } from '@nestjs/common';
import { PrEntity, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { Mapper } from '@pimp-my-pr/server/shared/domain';
import { UserModelWithPr } from '../domain/interfaces/user-model-with-pr.interface';

export class CustomUserWithPrMapper
  implements Mapper<[ReviewerEntity, PrEntity[]], UserModelWithPr> {
  mapFrom([reviewer, prs]: [ReviewerEntity, PrEntity[]]): UserModelWithPr {
    return {
      reviewer,
      prs
    };
  }

  mapTo(param: UserModelWithPr): [ReviewerEntity, PrEntity[]] {
    throw new NotImplementedException('Mapping to user model with pr format is not implemented');
  }
}
