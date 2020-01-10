import { Injectable, CanActivate, ExecutionContext, UnprocessableEntityException } from '@nestjs/common';
import { TokenRepository } from '../repositories/token.repository';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenRepository: TokenRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerHeader = request.headers.authorization;
    const token = bearerHeader.split(' ')[1];
    let isLogged: Token | undefined;
    try {
      isLogged = await this.tokenRepository.getTokenByParam('token', token);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!isLogged) {
      return false;
    }
    return true;
  }
}
