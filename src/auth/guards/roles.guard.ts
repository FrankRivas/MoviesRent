import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../../users/repositories/users.repository';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.userRepository.findOne({
        relations: ['rol'],
        where: { id: user.userId },
      });
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    const hasRole = roles.includes(userFromDB.rol.name);
    return user && hasRole;
  }
}
