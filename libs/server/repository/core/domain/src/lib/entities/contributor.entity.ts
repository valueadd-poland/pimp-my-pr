import { f } from '@marcj/marshal';

export abstract class ContributorEntity {
  @f
  name: string;
  @f
  id: number;
  @f
  avatarUrl: string;
  @f
  contributions: number;
}
