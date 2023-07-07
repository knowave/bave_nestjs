import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentBeach = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.beach;
  },
);
