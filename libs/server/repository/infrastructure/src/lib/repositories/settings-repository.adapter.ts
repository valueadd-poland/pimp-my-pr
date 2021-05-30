import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  commonSettingsEntityFactory,
  SettingEntity,
  TypeormRawSetting
} from '@pimp-my-pr/server/repository/core/domain';
import { Repository } from 'typeorm';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { SettingsSchema } from '../typeorm/schema/settings.schema';
import { RepositoryCommonSettingType } from '@pimp-my-pr/shared/domain';

@Injectable()
export class SettingsRepositoryAdapter extends SettingsRepository {
  constructor(
    @InjectRepository(SettingsSchema)
    private typeOrmRepository: Repository<SettingEntity>
  ) {
    super();
  }

  getByUser(userId: string): Promise<SettingEntity[]> {
    return this.typeOrmRepository
      .createQueryBuilder('setting')
      .where('setting.userId = :id', { id: userId })
      .getRawMany<TypeormRawSetting>()
      .then(resp => resp.map(entity => commonSettingsEntityFactory(entity)));
  }

  async save(setting: SettingEntity): Promise<void> {
    await this.typeOrmRepository.save(setting);
  }

  async delete(setting: SettingEntity): Promise<void> {
    await this.typeOrmRepository.remove(setting);
  }

  getById(id: string): Promise<SettingEntity> {
    return this.typeOrmRepository
      .createQueryBuilder('setting')
      .where('setting.id = :id', { id })
      .getRawOne<TypeormRawSetting>()
      .then(entity => commonSettingsEntityFactory(entity));
  }

  getByUserAndType(
    userId: string,
    settingType: RepositoryCommonSettingType
  ): Promise<SettingEntity> {
    return this.typeOrmRepository.findOne({
      userId,
      settingType
    });
  }
}
