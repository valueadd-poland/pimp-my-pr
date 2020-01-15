import { PrModel } from './pr.model';
import { BaseRepositoryModel } from './base-repository.model';

export class RepositoryModel extends BaseRepositoryModel {
  prs: PrModel[];
}
