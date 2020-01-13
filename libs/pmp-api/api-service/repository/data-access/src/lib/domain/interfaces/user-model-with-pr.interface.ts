import { PrModel, UserModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';

export interface UserModelWithPr {
  reviewer: UserModel;
  prs: PrModel[];
}
