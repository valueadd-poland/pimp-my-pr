import { Mapper } from '@pimp-my-pr/pmp-api/shared/domain';
import { UserModelWithPr } from '../domain/interfaces/user-model-with-pr.interface';
import { PrModel, UserModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { NotImplementedException } from '@nestjs/common';

export class CustomUserWithPrMapper implements Mapper<[UserModel, PrModel[]], UserModelWithPr> {
  mapFrom([reviewer, prs]: [UserModel, PrModel[]]): UserModelWithPr {
    return {
      reviewer,
      prs
    };
  }

  mapTo(param: UserModelWithPr): [UserModel, PrModel[]] {
    throw new NotImplementedException('Mapping to user model with pr format is not implemented');
  }
}
