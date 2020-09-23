import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserAddedEvent } from '@pimp-my-pr/server/shared/domain';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { defaultSettingFactory } from '@pimp-my-pr/server/repository/core/domain';

@EventsHandler(UserAddedEvent)
export class UserAddedEventHandler implements IEventHandler<UserAddedEvent> {
  constructor(private repository: SettingsRepository) {}

  async handle(event: UserAddedEvent): Promise<void> {
    const { userId } = event;

    await this.repository.save(defaultSettingFactory('maxPendingPR', userId));
    await this.repository.save(defaultSettingFactory('maxSumTimeForPR', userId));
    await this.repository.save(defaultSettingFactory('maxTotalLines', userId));
  }
}
