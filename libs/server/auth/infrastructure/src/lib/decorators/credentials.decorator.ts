import { createParamDecorator } from '@nestjs/common';

export const Credentials = createParamDecorator((data: unknown, req) => req.credentials);
