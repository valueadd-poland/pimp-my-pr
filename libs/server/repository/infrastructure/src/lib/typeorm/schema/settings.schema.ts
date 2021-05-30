import { EntitySchema } from 'typeorm';
import { SettingEntity } from '@pimp-my-pr/server/repository/core/domain';

interface RepositoryRelations {
  user: undefined;
}

export const schema = new EntitySchema<SettingEntity | RepositoryRelations>({
  name: 'SettingEntity',
  target: SettingEntity,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    value: {
      type: String
    },
    type: {
      type: String
    },
    settingType: {
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

export const SettingsSchema = schema;
