import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenRepository } from '../repositories/token.repository';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenRepository: TokenRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerHeader = request.headers.authorization;
    const token = bearerHeader.split(' ')[1];
    const isLogged = await this.tokenRepository.getTokenByParam('token', token);
    if (!isLogged) {
      return false;
    }
    return true;
  }
}
