import { PrEntity } from './pr.entity';

export class RepositoryEntity {
  id: number;
  fullName: string;
  name: string;
  owner: string;
  pictureUrl: string;
  prs: PrEntity[];
}
