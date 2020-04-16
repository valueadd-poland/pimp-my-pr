import { User } from '@pimp-my-pr/server/user/core/domain';
import { EntitySchema } from 'typeorm';

const schema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    avatarUrl: {
      type: String
    },
    id: {
      type: String,
      primary: true
    },
    name: {
      type: String
    }
  }
});

// @ts-ignore https://github.com/nestjs/typeorm/issues/151
schema.name = 'User';
export const UserSchema = schema;
