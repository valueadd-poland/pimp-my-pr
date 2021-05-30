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

export const UserSchema = schema;
