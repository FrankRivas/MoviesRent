import { Injectable, UnauthorizedException, HttpException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/users/dto/userLogin.dto';
import { UserRepository } from 'src/users/repositories/users.repository';
import { TokenRepository } from './repositories/token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}
  async validateUser(username: string, pass: string): Promise<{}> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.userRepository.findOne({
        relations: ['rol'],
        where: [{ username }],
      });
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      // If user does not exist
      throw new UnauthorizedException('Wrong Credentials');
    }
    if (!userFromDB.isActive) {
      throw new UnauthorizedException('Your account was deactivated');
    }
    let passwordMatch = false;
    try {
      passwordMatch = await bcrypt.compare(pass, userFromDB.password);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!passwordMatch) {
      // If invalid password
      throw new UnauthorizedException('Wrong Credentials');
    }
    const { password, ...result } = userFromDB;
    return result;
  }

  login(user: UserLoginDto): {} {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    this.saveToken(user.id, accessToken);
    return {
      accessToken,
    };
  }

  async saveToken(id: number, token: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    const tokenToSave = {
      user,
      token,
    };
    this.tokenRepository.save(tokenToSave);
  }

  async deleteToken(token: string): Promise<void> {
    const tokenFromDB = await this.tokenRepository.getTokenByParam('token', token);
    if (tokenFromDB) {
      this.tokenRepository.delete(tokenFromDB);
    }
  }
}
