import { f } from '@marcj/marshal';

export class PrCachedEntity {
  @f
  additions: number;

  @f
  authorId: string;

  @f
  changedFiles: number;

  @f.optional()
  closedAt?: Date;

  @f
  commentsCount: number;

  @f
  createdAt: Date;

  @f
  deletions: number;

  @f
  id: string;

  @f
  state: 'open' | 'closed';

  @f
  title: string;

  @f
  updatedAt: Date;

  @f
  url: string;
}
