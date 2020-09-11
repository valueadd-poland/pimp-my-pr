import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserAddedEvent } from '@pimp-my-pr/server/shared/domain';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import {
  MaxPendingPrSettingEntity,
  MaxTimePrWaitingSettingEntity
} from '@pimp-my-pr/server/repository/core/domain';

@EventsHandler(UserAddedEvent)
export class UserAddedEventHandler implements IEventHandler<UserAddedEvent> {
  constructor(private repository: SettingsRepository) {}

  async handle(event: UserAddedEvent): Promise<void> {
    const { userId } = event;

    await this.repository.save(new MaxTimePrWaitingSettingEntity(userId));
    await this.repository.save(new MaxPendingPrSettingEntity(userId));
  }
}
