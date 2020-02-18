import { Mapper } from '@pimp-my-pr/server/shared/domain';
import { UserModelWithPr } from '../domain/interfaces/user-model-with-pr.interface';
import { PrModel, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { NotImplementedException } from '@nestjs/common';

export class CustomUserWithPrMapper
  implements Mapper<[ReviewerEntity, PrModel[]], UserModelWithPr> {
  mapFrom([reviewer, prs]: [ReviewerEntity, PrModel[]]): UserModelWithPr {
    return {
      reviewer,
      prs
    };
  }

  mapTo(param: UserModelWithPr): [ReviewerEntity, PrModel[]] {
    throw new NotImplementedException('Mapping to user model with pr format is not implemented');
  }
}
