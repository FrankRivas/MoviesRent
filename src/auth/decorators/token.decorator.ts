import { createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator((data, req) => {
  const bearerHeader = req.headers.authorization;
  return bearerHeader.split(' ')[1];
});
