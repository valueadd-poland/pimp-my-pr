import { ReviewerEntity } from './reviewer.entity';

export class PrModel {
  closedAt: Date;
  createdAt: Date;
  url: string;
  id: number;
  reviewers: ReviewerEntity[];
  state: 'open' | 'closed';
  title: string;
  updatedAt: Date;
  user: ReviewerEntity;
}
