import { UserModel } from './user.model';

export class PrModel {
  closedAt: Date;
  createdAt: Date;
  url: string;
  id: number;
  reviewers: UserModel[];
  state: 'open' | 'closed';
  title: string;
  updatedAt: Date;
  user: UserModel;
}
