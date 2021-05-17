import { f } from '@marcj/marshal';

export class ContributorCachedEntity {
  @f
  name: string;
  @f
  id: string;
  @f
  avatarUrl: string;
  @f
  contributions?: number;
}
