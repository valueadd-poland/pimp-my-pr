import { createParamDecorator } from '@nestjs/common';

export const CurrentUserId = createParamDecorator((data: unknown, req) => req.user.id);
