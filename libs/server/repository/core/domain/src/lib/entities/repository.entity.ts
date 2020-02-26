import { f } from '@marcj/marshal';
import { PrEntity } from './pr.entity';

export class RepositoryEntity {
  @f.primary()
  id: number;
  @f
  fullName: string;
  @f
  name: string;
  @f
  owner: string;
  @f
  pictureUrl: string;
  @f.array(PrEntity)
  prs: PrEntity[] = [];
}
