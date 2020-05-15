import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { EntitySchema } from 'typeorm';

interface RepositoryRelations {
  user: undefined;
}

export const schema = new EntitySchema<RepositoryEntity | RepositoryRelations>({
  name: 'RepositoryEntity',
  target: RepositoryEntity,
  columns: {
    id: {
      type: String,
      primary: true
    },
    maxLines: {
      type: Number,
      nullable: true
    },
    maxWaitingTime: {
      type: Number,
      nullable: true
    },
    maxPrs: {
      type: Number,
      nullable: true
    },
    name: {
      type: String
    },
    owner: {
      type: String
    },
    pictureUrl: {
      type: String
    },
    repositoryId: {
      type: String
    },
    userId: {
      type: String
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User'
    }
  }
});

// @ts-ignore https://github.com/nestjs/typeorm/issues/151
schema.name = 'RepositoryEntity';
export const RepositorySchema = schema;
