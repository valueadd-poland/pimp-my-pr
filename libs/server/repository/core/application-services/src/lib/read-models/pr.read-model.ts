import { ApiProperty } from '@nestjs/swagger';
import { AuthorReadModel } from './author.read-model';
import { ReviewerReadModel } from './reviewer.read-model';

export class PrReadModel {
  @ApiProperty()
  additions: number;
  @ApiProperty()
  author: AuthorReadModel;
  @ApiProperty()
  changedFiles: number;
  @ApiProperty()
  closedAt?: Date;
  @ApiProperty()
  commentsCount: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  deletions: number;
  @ApiProperty()
  id: string;
  @ApiProperty()
  reviewers: ReviewerReadModel[];
  @ApiProperty()
  state: 'open' | 'closed';
  @ApiProperty()
  title: string;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  url: string;
}
