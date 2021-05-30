import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Credentials = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().credentials
);
