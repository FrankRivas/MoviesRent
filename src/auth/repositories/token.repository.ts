import { EntityRepository, Repository } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { Token } from '../entities/token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async getTokenByParam(param: string, value: string | number): Promise<Token | undefined> {
    let token: Token | undefined;
    try {
      token = await this.findOne({ where: [{ [param]: value }] });
    } catch {
      throw new UnprocessableEntityException();
    }
    return token;
  }
}
