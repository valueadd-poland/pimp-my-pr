import { EntitySchema } from 'typeorm';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';

interface PrRelations {
  author: undefined;
  reviewers: undefined;
  repository: undefined;
}

export const schema = new EntitySchema<PrEntity | PrRelations>({
  name: 'PrEntity',
  tableName: 'prs',
  target: PrEntity,
  columns: {
    additions: {
      type: Number
    },
    changedFiles: {
      type: Number
    },
    closedAt: {
      type: Date,
      nullable: true
    },
    commentsCount: {
      type: Number
    },
    createdAt: {
      type: Date
    },
    deletions: {
      type: Number
    },
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    state: {
      type: String
    },
    title: {
      type: String
    },
    updatedAt: {
      type: Date
    },
    url: {
      type: String
    }
  },
  relations: {
    reviewers: {
      type: 'many-to-many',
      target: 'ContributorEntity',
      inverseSide: 'reviewedPrs'
    },
    author: {
      type: 'many-to-one',
      target: 'ContributorEntity'
    },
    repository: {
      type: 'many-to-one',
      target: 'RepositoryEntity',
      inverseSide: 'prs'
    }
  }
});

// @ts-ignore https://github.com/nestjs/typeorm/issues/151
schema.name = 'PrEntity';
export const PrSchema = schema;
