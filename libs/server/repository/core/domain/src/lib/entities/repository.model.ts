import { PrModel } from './pr.model';

export class RepositoryModel {
  id: number;
  fullName: string;
  name: string;
  owner: string;
  pictureUrl: string;
  prs: PrModel[];
}
