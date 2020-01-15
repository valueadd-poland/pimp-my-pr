import { PrModel } from './pr.model';

export class PrDetailsModel extends PrModel {
  reviewCommentsCount: number;
  commentsCount: number;
  additions: number;
  deletions: number;
  changedFiles: number;
}
