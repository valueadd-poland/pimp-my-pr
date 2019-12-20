import { PrModel } from './pr.model';

export class RepositoryModel {
  fullName: string;
  name: string;
  owner: string;
  prs: PrModel[];
}
