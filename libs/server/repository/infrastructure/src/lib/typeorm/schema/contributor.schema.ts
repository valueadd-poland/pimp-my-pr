import { EntitySchema } from 'typeorm';
import {
  ContributorCachedEntity,
  ContributorEntity
} from '@pimp-my-pr/server/repository/core/domain';

interface ContributorRelations {
  createdPrs: undefined;
  reviewedPrs: undefined;
}

export const schema = new EntitySchema<ContributorEntity | ContributorRelations>({
  name: 'ContributorEntity',
  tableName: 'contributors',
  target: ContributorEntity,
  columns: {
    name: {
      type: String
    },
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    avatarUrl: {
      type: String
    },
    contributions: {
      type: Number,
      nullable: true
    }
  },
  relations: {
    reviewedPrs: {
      target: 'PrEntity',
      type: 'many-to-many',
      joinTable: {
        name: 'contributor_reviewed',
        joinColumn: {
          name: 'contributor_id'
        },
        inverseJoinColumn: {
          name: 'pr_cached_id'
        }
      },
      inverseSide: 'reviewers',
      cascade: true
    },
    createdPrs: {
      type: 'one-to-many',
      target: 'PrEntity',
      inverseSide: 'author'
    }
  }
});

// @ts-ignore https://github.com/nestjs/typeorm/issues/151
schema.name = 'ContributorCachedEntity';
export const ContributorSchema = schema;
