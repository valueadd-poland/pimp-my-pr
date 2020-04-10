import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Credentials = createParamDecorator((data: unknown, req: Request) => req.credentials);
