import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, CurrentUserId } from '@pimp-my-pr/server/auth/public';

import {
  DeleteSettingCommand,
  EditSettingsCommand
} from '@pimp-my-pr/server/repository/core/application-services';
import { SettingsFacade } from '@pimp-my-pr/server/repository/core/application-services';
import { GetUserSettingsReadModel } from '@pimp-my-pr/server/repository/core/application-services';
import { EditSettingsDto } from '../dtos/edit-settings.dto';
import { UserSettingsGuard } from '../guards/user-settings.guard';

@ApiTags('settings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private settingsFacade: SettingsFacade) {}

  @Get()
  @ApiOkResponse({ type: [GetUserSettingsReadModel] })
  list(@CurrentUserId() currentUserId: string): Promise<GetUserSettingsReadModel[]> {
    return this.settingsFacade.getSettings(currentUserId).then(a => {
      return a;
    });
  }

  @UseGuards(UserSettingsGuard)
  @Put()
  edit(@Body() editSettingDto: EditSettingsDto): Promise<void> {
    return this.settingsFacade.editSettings(new EditSettingsCommand(editSettingDto.patch));
  }
}
